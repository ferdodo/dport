import { default as SshTunnel, State } from "../../lib/ssh-tunnel";
import SshTunnelConfig from "../../lib/ssh-tunnel-config";

interface Gui extends Data, ComputedData, Methods {};

interface Data {
	config: SshTunnelConfig
};

interface Methods {
	update(SshTunnel, any): void; 
	start(SshTunnel): Promise<void>;
	stop(SshTunnel): Promise<void>;
	add(): void;
	remove(SshTunnel): void;
};

interface ComputedData {
	duplicatedExternalPorts: Boolean;
};

interface Computed {
	duplicatedExternalPorts(): Boolean;
};

export default {
	data(): Data {
		const defaultConf = new SshTunnelConfig([
			new SshTunnel(), 
			new SshTunnel().set({ externalPort: 8081 })
		]);

		const loaded = SshTunnelConfig.load();

		return {
			config: loaded.size ? loaded : defaultConf
		};
	},

	methods: <Methods> {
		update(sshTunnel, props){
			const gui = this as unknown as Gui;
			gui.config = gui.config.update(sshTunnel, sshTunnel.set(props));
		},

		async start (sshTunnel) {
			const gui = this as unknown as Gui;
			const started = sshTunnel.set({'state': State.Started});
			gui.config = gui.config.update(sshTunnel, started);
			const stopped = await started.waitEnd();
			gui.config = gui.config.update(started, stopped);
		},

		async stop(sshTunnel) {
			const gui = this as unknown as Gui;
			const stoppedSshTunnel = await sshTunnel.stop();
			gui.config = gui.config.update(sshTunnel, stoppedSshTunnel);
		},

		add () {
			const gui = this as unknown as Gui;
			gui.config = gui.config.add(new SshTunnel());
		},

		remove (sshTunnel) {
			const gui = this as unknown as Gui;
			gui.config = gui.config.remove(sshTunnel);
		}
	},
	computed: <Computed> {
		duplicatedExternalPorts() {
			const gui = this as unknown as Gui;
			const externalPorts = [...gui.config].map((sshTunnel) => sshTunnel.externalPort);
			return externalPorts.length != new Set(externalPorts).size;
		}
	},
	watch: {
		config() {
			const gui = this as unknown as Gui;
			gui.config.save();
		}
	}
};
