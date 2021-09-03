import { default as SshTunnel, State } from "../../lib/ssh-tunnel";
import SshTunnelConfig from "../../lib/ssh-tunnel-config";

export default {
	data() {
		const config = SshTunnelConfig.load();
		return { config };
	},

	methods: {
		update(sshTunnel, props){
			this.config = this.config.update(sshTunnel, sshTunnel.set(props));
		},

		async start (sshTunnel) {
			const started = sshTunnel.set({'state': State.Started});
			this.config = this.config.update(sshTunnel, started);
			const stopped = await started.waitEnd();
			this.config = this.config.update(started, stopped);
		},

		async stop(sshTunnel) {
			const stoppedSshTunnel = await sshTunnel.stop();
			this.config = this.config.update(sshTunnel, stoppedSshTunnel);
		},

		add () {
			this.config = this.config.add(new SshTunnel());
		},

		remove (sshTunnel) {
			this.config = this.config.remove(sshTunnel);
		}
	},
	computed: {
		duplicatedExternalPorts() {
			const externalPorts = [...this.config].map((sshTunnel) => sshTunnel.externalPort);
			return externalPorts.length != new Set(externalPorts).size;
		}
	},
	watch: {
		config() {
			this.config.save();
		}
	}
};
