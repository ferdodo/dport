const { spawn } = require("child_process");
import { default as Redirection, RedirectionJson } from '../../lib/redirection.ts';

export default class RedirectionMain extends Redirection {
	#process: any;

	constructor(props: RedirectionJson) {
		super(props);

		const args = [
			"-p",
			`${ this.targetSshPort }`,
			"-L",
			`${ this.externalPort }:${ this.internalHost }:${ this.internalPort }`,
			`${ this.user }@${ this.targetHost }`,
			"sleep",
			"infinity",
		];

		this.#process = spawn("ssh", args);
	}

	waitStop() {
		return new Promise(resolve => {
			this.#process.on("close", resolve);
		});
	}

	stop() {
		this.#process.kill();
	}
};
