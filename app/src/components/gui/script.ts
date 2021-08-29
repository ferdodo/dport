import { default as SshTunnel, State, SshTunnelJson } from "../../lib/ssh-tunnel";
import { dbGet, dbSet } from "../../lib/nosql-db";

interface Gui extends Data, ComputedData, Methods {};

interface Data {
	sshTunnels: SshTunnel[];
};

interface Methods {
	update(property: string, index: number, value: any): void; 
	start(index: number): Promise<void>;
	stop(index: number): Promise<void>;
	add(): void;
	remove(index: number): void;
	loadConfig(): SshTunnel[];
	saveConfig(): void;
};

interface ComputedData {
	duplicatedExternalPorts: Boolean;
	config: SshTunnelJson[];
};

interface Computed {
	duplicatedExternalPorts(): Boolean;
	config(): SshTunnelJson[];
};

export default {
	data(): Data {
		const gui = this as unknown as Gui;
		const defaultConf = [new SshTunnel(), new SshTunnel().set({ externalPort: 8081 })];
		const loaded = gui.loadConfig();

		return {
			sshTunnels: loaded.length ? loaded : defaultConf
		};
	},

	methods: <Methods> {
		update(property, index, value) {
			const gui = this as unknown as Gui;

			gui.sshTunnels = Object.assign([], gui.sshTunnels, { 
				[index]: gui.sshTunnels[index].set({ [property]: value })
			});
		},

		async start (index) {
			const gui = this as unknown as Gui;
			gui.update('state', index, State.Started);

			gui.sshTunnels = Object.assign([], gui.sshTunnels, { 
				[index]: await gui.sshTunnels[index].waitEnd()
			});
		},

		async stop(index) {
			const gui = this as unknown as Gui;

			gui.sshTunnels = Object.assign([], gui.sshTunnels, { 
				[index]: await gui.sshTunnels[index].stop()
			});
		},

		add () {
			const gui = this as unknown as Gui;
			gui.sshTunnels = [...gui.sshTunnels, new SshTunnel()];
		},

		remove (index) {
			const gui = this as unknown as Gui;
			gui.sshTunnels.splice(index, 1);
			gui.sshTunnels = [...gui.sshTunnels];
		},

		loadConfig() {
			const config = dbGet("config") || [];
			return config.map(props => new SshTunnel(props));
		},

		saveConfig() {
			const gui = this as unknown as Gui;
			dbSet("config", gui.config);
		}
	},
	computed: <Computed> {
		duplicatedExternalPorts() {
			const gui = this as unknown as Gui;
			const externalPorts = gui.sshTunnels.map((sshTunnel) => sshTunnel.externalPort);
			return externalPorts.length != new Set(externalPorts).size;
		},

		config () {
			const gui = this as unknown as Gui;

			return gui.sshTunnels.map((sshTunnel) => ({ 
				...sshTunnel.json, 
				state: State.Stopped 
			}));
		}
	},
	watch: {
		config() {
			const gui = this as unknown as Gui;

			gui.saveConfig();
		}
	}
};
