import { default as Redirection, RedirectionJson } from '../../../lib/redirection.ts';

export enum State {
	Started,
	Stopped,
}

export default class RedirectionRenderer extends Redirection {
	#ipcRenderer: any;
	#state: State;

	constructor(props: RedirectionJson, ipcRenderer: any, state = State.Stopped) {
		super(props);
		this.#ipcRenderer = ipcRenderer;
		this.#state = state;
	}

	get state(){
		return this.#state;
	}

	set(props: RedirectionJson, state = State.Stopped){
		const newProps = super.set(props).json;
		return new RedirectionRenderer(newProps, this.#ipcRenderer, state);
	}

	async start() {
		await this.#ipcRenderer.invoke("startRedirection", this.json);
	}

	async stop() {
		await this.#ipcRenderer.invoke("stopRedirection", this.json);
	}
}