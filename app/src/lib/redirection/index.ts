import { default as RedirectionModel, RedirectionJson, State } from "./model";
export { State } from "./model";
import Command from '../command';

export default class Redirection extends RedirectionModel {
	#command;

	constructor(props: RedirectionJson = {}) {
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

	set(props: RedirectionJson) {
		return new Redirection(super.set(props).json);
	}

	async stop() {
		this.assertToBeStarted();
		await this.#command.kill();
		return this.set({ state: State.Stopped });
	}

	async waitEnd() {
		this.assertToBeStarted();
		await this.#command.waitEnd();
		return this.set({ state: State.Stopped });
	}
}
