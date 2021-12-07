import SshTunnelConfig from "dport/lib/ssh-tunnel-config";
import { default as SshTunnel, State } from "dport/lib/ssh-tunnel";
import { ref } from "vue/dist/vue.cjs.js";

export default function useConfig() {
	let config = ref(SshTunnelConfig.load());

	function add () {
		const tunnel = new SshTunnel();
		config.value = config.value.add(tunnel);
	}

	function remove (sshTunnel) {
		config.value = config.value.remove(sshTunnel);
	}

	function update (sshTunnel, props) {
		config.value = config.value.update(sshTunnel, sshTunnel.set(props));
	}

	async function start (sshTunnel: SshTunnel) {
		const started = sshTunnel.set({ state: State.Started });
		config.value = config.value.update(sshTunnel, started);
		const stopped = await started.waitEnd();
		config.value = config.value.update(started, stopped);
	}

	async function stop (sshTunnel) {
		const stopped = await sshTunnel.stop();
		config.value = config.value.update(sshTunnel, stopped);
	}

	return {
		config,
		add,
		remove,
		update,
		start,
		stop
	};
}
