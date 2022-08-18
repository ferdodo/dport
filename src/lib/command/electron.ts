import { ipcRenderer } from "electron";
import { CommandClass, CommandInstance } from ".";

let idSeed = 0;

export const CommandElectron: CommandClass = class implements CommandInstance {
	#id;
	#ipc;

	constructor(command: string, args: string[]){
		this.#id = idSeed;
		idSeed++;
		this.#ipc = ipcRenderer.invoke("command", { id: this.#id, command, args });
	}

	async kill() {
		await ipcRenderer.invoke("commandKill", { id: this.#id });
	}

	async waitEnd() {
		await this.#ipc;
	}
}
