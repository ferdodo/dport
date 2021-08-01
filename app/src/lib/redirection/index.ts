import { default as RedirectionModel, RedirectionJson, State } from "./model";
import { startRedirection } from "./utils";
export { State } from "./model";

export default class Redirection extends RedirectionModel {
	#waitRedirectionEnd;
	#stopRedirection;

	constructor(props: RedirectionJson = {}) {
		super(props);

		if (this.isStarted){
			[ 
				this.#waitRedirectionEnd, 
				this.#stopRedirection 
			] = startRedirection(props);
		}
	}

	set(props: RedirectionJson) {
		return new Redirection(super.set(props).json);
	}

	async stop() {
		if (this.isStopped){
			throw new Error("Redirection is not started !");
		}

		await this.#stopRedirection();
		return this.set({ state: State.Stopped });
	}

	async waitEnd() {
		if (this.isStopped){
			throw new Error("Redirection is not started !");
		}

		await this.#waitRedirectionEnd;
		return this.set({ state: State.Stopped });
	}
}
