import { default as SshTunnel, State } from "dport/lib/ssh-tunnel";

export function add ({ state, commit }) {
	commit('set', state.config.add(new SshTunnel()));
}

export function remove ({ state, commit }, sshTunnel) {
	commit('set', state.config.remove(sshTunnel));
}

export function update({ state, commit }, { sshTunnel, props }){
	commit('set', state.config.update(sshTunnel, sshTunnel.set(props)));
};

export async function start ({ state, commit }, sshTunnel) {
	const started = sshTunnel.set({'state': State.Started});
	commit('set', state.config.update(sshTunnel, started));
	const stopped = await started.waitEnd();
	commit('set', state.config.update(started, stopped));
}

export async function stop({ state, commit }, sshTunnel) {
	const stoppedSshTunnel = await sshTunnel.stop();
	commit('set', state.config.update(sshTunnel, stoppedSshTunnel));
}
