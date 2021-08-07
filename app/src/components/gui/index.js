import template from "./template.html";
import { default as SshTunnel, State} from "../../lib/ssh-tunnel";
import Vue from "vue";
import "./style.css";

export default {
	template,

	data() {
		const defaultConf = [new SshTunnel(), new SshTunnel().set({ externalPort: 8081 })];
		const loaded = this.loadConfig();

		return {
			sshTunnels: loaded.length ? loaded : defaultConf,
			State
		};
	},

	methods: {
		update(property, index, value) {
			this.sshTunnels = Object.assign([], this.sshTunnels, { 
				[index]: this.sshTunnels[index].set({ [property]: value })
			});
		},

		async start (index) {
			this.update('state', index, State.Started);

			this.sshTunnels = Object.assign([], this.sshTunnels, { 
				[index]: await this.sshTunnels[index].waitEnd()
			});
		},

		async stop(index) {
			this.sshTunnels = Object.assign([], this.sshTunnels, { 
				[index]: await this.sshTunnels[index].stop()
			});
		},

		add () {
			this.sshTunnels = [...this.sshTunnels, new SshTunnel()];
		},

		remove (index) {
			this.sshTunnels.splice(index, 1)
			this.sshTunnels = [...sshTunnels];
		},

		loadConfig() {
			const config = JSON.parse(window.localStorage.getItem("config")) || [];
			return config.map(props => new SshTunnel(props));
		},

		saveConfig() {
			const value = JSON.stringify(this.config);
			window.localStorage.setItem("config", value);
		}
	},
	computed: {
		duplicatedExternalPorts() {
			const externalPorts = this.sshTunnels.map((sshTunnel) => sshTunnel.externalPort);
			return externalPorts.length != new Set(externalPorts).size;
		},

		config () {
			return this.sshTunnels.map((sshTunnel) => ({ 
				...sshTunnel.json, 
				state: State.Stopped 
			}));
		}
	},
	watch: {
		config() {
			this.saveConfig();
		}
	}
};
