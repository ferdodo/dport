import { default as RedirectionModel, RedirectionJson, State } from "./model";
export { State } from "./model";
import { Command } from './utils';

export default class Redirection extends RedirectionModel {
	#command;
	#waitChild;

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

			// async function wrapper(command){
			// 	const child = await command.spawn();
			// 	return child;
			// }
// 
			// this.#waitChild = wrapper(this.#command);

			this.#waitChild = this.#command.spawn();			
		}
	}

	set(props: RedirectionJson) {
		return new Redirection(super.set(props).json);
	}

	async stop() {
		if (this.isStopped){
			throw new Error("Redirection is not started !");
		}

		const child = await this.#waitChild;
		await child.kill();
		return this.set({ state: State.Stopped });
	}

	async waitEnd() {
		if (this.isStopped){
			throw new Error("Redirection is not started !");
		}

		await new Promise(resolve => {
			this.#command.on('close', () => { resolve(); });
		});

		return this.set({ state: State.Stopped });
	}
}
