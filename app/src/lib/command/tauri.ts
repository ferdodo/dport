import { Command as CommandTauri } from '@tauri-apps/api/shell';
import { CommandClass, CommandInstance } from './index';

const Command: CommandClass = class implements CommandInstance {
	#process;
	#waitChild;

	constructor(command, args){
		this.#process = new CommandTauri(command, args);
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

export default Command;