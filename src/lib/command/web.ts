import { CommandClass, CommandInstance } from ".";

export const CommandWeb: CommandClass = class implements CommandInstance {
	async kill() {
		await Promise.resolve();
	}

	async waitEnd() {
		await new Promise(r => setTimeout(r, 1000000000));
	}
}
