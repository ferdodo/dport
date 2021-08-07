import { Command as CommandTauri } from '@tauri-apps/api/shell';

export default class Command {
	constructor(command, args){
		this._process = new CommandTauri(command, args);
		this._waitChild = this._process.spawn();
	}

	async kill() {
		const child = await this._waitChild;
		await child.kill();
	}

	async waitEnd() {
		await new Promise(resolve => {
			this._process.on('close', () => { resolve(); });
		});
	}
}