const { spawn } = require("child_process");
import { default as Redirection, RedirectionJson } from "../../../lib/redirection";

export default class RedirectionMain extends Redirection {
	#process;

	constructor(props: RedirectionJson) {
		super(props);

		const args = [
			"-p",
			`${super.targetSshPort}`,
			"-L",
			`${super.externalPort}:${super.internalHost}:${super.internalPort}`,
			`${super.user}@${super.targetHost}`,
			"sleep",
			"infinity"
		];

		this.#process = spawn("ssh", args);
	}

	waitStop() {
		return new Promise((resolve) => {
			this.#process.on("close", resolve);
		});
	}

	stop() {
		this.#process.kill();
	}
}
