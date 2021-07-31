import { default as RedirectionModel, RedirectionJson } from "./model";
export { State } from "./model"

export default class Redirection extends RedirectionModel {
	constructor(props?: RedirectionJson) {
		super(props);
	}

	set(props: RedirectionJson) {
		return new Redirection(props);
	}

	async start() {
		await Promise.resolve();
	}

	async stop() {
		await Promise.resolve();
	}
}
