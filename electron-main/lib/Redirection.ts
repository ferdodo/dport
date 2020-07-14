const { spawn } = require("child_process");

module.exports = class Redirection {
	_process: any;

	constructor(externalPort: number, internalPort: number, internalHost: string, targetHost: string, targetSshPort: string, user: string) {
		const args = [
			"-p",
			`${targetSshPort}`,
			"-L",
			`${externalPort}:${internalHost}:${internalPort}`,
			`${user}@${targetHost}`,
			"sleep",
			"infinity",
		];

		this._process = spawn("ssh", args);
	}

	waitStop() {
		const process = this._process;

		return new Promise(function (resolve) {
			process.on("close", resolve);
		});
	}

	stop() {
		this._process.kill();
	}
};
