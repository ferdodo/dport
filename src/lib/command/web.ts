import { CommandClass, CommandInstance } from ".";

const Command: CommandClass = class implements CommandInstance {
	async kill() {
		await Promise.resolve();
	}

	async waitEnd() {
		await new Promise(r => setTimeout(r, 1000000000));
	}
}

export default Command;
