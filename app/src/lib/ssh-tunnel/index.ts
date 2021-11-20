import { default as SshTunnelModel, SshTunnelJson, State } from "./model";
export { State } from "./model";
export { SshTunnelJson } from "./model";
import Command from '../command';

export default class SshTunnel extends SshTunnelModel {
	#command;

	constructor(props: SshTunnelJson = {}) {
		super(props);

		if (this.isStarted){
			const args = [
				"-p",
				`${this.targetSshPort}`,
				"-L",
				`${this.externalPort}:${this.internalHost}:${this.internalPort}`,
				`${this.user}@${this.targetHost}`,
				"sleep",
				"infinity"
			];

			this.#command = new Command('ssh', args);
		}
	}

	set(props: SshTunnelJson) {
		return new SshTunnel({ ...this.json, ...props });
	}

	async stop() {
		await this.#command.kill();
		return this.set({ state: State.Stopped });
	}

	async waitEnd() {
		await this.#command.waitEnd();
		return this.set({ state: State.Stopped });
	}
}
