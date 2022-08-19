import { Command } from '@tauri-apps/api/shell';
import { CommandClass, CommandInstance } from '.';

export const CommandTauri: CommandClass = class implements CommandInstance {
	#process;
	#waitChild;

	constructor(command, args) {
		this.#process = new Command(command, args);
		this.#waitChild = this.#process.spawn();
	}

	async kill() {
		const child = await this.#waitChild;
		await child.kill();
	}

	async waitEnd() {
		await new Promise(resolve => {
			this.#process.on('close', () => { resolve(null); });
		});
	}
}
