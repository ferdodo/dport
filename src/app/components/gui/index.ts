import { render } from "./template";
import SshTunnelConfig from "dport/lib/ssh-tunnel-config";
import { default as SshTunnel, State, SshTunnelJson } from "dport/lib/ssh-tunnel";
import { ref } from "vue/dist/vue.runtime.esm-bundler.js";

export default {
	render,

	setup() {
		let config: SshTunnelConfig = SshTunnelConfig.load();
		let getConfig = ref(() => config);

		function add () {
			const config: SshTunnelConfig = getConfig.value();
			const tunnel: SshTunnel = new SshTunnel();
			const newConfig: SshTunnelConfig = config.add(tunnel);
			getConfig.value = () => newConfig;
		}

		function remove (sshTunnel: SshTunnel) {
			const config: SshTunnelConfig = getConfig.value();
			const newConfig: SshTunnelConfig = config.remove(sshTunnel);
			getConfig.value = () => newConfig;
		}

		function update (sshTunnel: SshTunnel, props: SshTunnelJson) {
			const config: SshTunnelConfig = getConfig.value();
			const updatedTunnel: SshTunnel = sshTunnel.set(props);
			const newConfig = config.update(sshTunnel, updatedTunnel);
			getConfig.value = () => newConfig;
		}

		async function start (sshTunnel: SshTunnel) {
			const config: SshTunnelConfig= getConfig.value();
			const started: SshTunnel = sshTunnel.set({ state: State.Started });
			const newConfig = config.update(sshTunnel, started);
			getConfig.value = () => newConfig;
			const stopped: SshTunnel = await started.waitEnd();
			const newConfig2 = newConfig.update(started, stopped);
			getConfig.value = () => newConfig2;
		}

		async function stop (sshTunnel) {
			const config: SshTunnelConfig = getConfig.value();
			const stopped: SshTunnel = await sshTunnel.stop();
			const newConfig: SshTunnelConfig = config.update(sshTunnel, stopped);
			getConfig.value = () => newConfig;
		}

		return {
			getConfig,
			add,
			remove,
			update,
			start,
			stop
		};
	}
};
