import { default as Redirection, RedirectionJson } from "../../lib/redirection";

export enum State {
	Started,
	Stopped
}

export default class RedirectionRenderer extends Redirection {
	#ipcRenderer;
	#state: State;

	constructor(props: RedirectionJson, ipcRenderer, state = State.Stopped) {
		super(props);
		this.#ipcRenderer = ipcRenderer;
		this.#state = state;
	}

	get state() {
		return this.#state;
	}

	set(props: RedirectionJson, state?: State) {
		const newProps = super.set(props).json;
		return new RedirectionRenderer(newProps, this.#ipcRenderer, state);
	}

	async start() {
		await this.#ipcRenderer.invoke("startRedirection", super.json);
	}

	async stop() {
		await this.#ipcRenderer.invoke("stopRedirection", super.json);
	}
}
