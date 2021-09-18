import { ipcRenderer } from "electron";
import { v4 as createUuid } from 'uuid';
import { CommandClass, CommandInstance } from "./index";

const Command: CommandClass = class implements CommandInstance {
	#uuid;
	#ipc;

	constructor(command: string, args: string[]){
		const uuid = createUuid();
		this.#uuid = uuid;
		this.#ipc = ipcRenderer.invoke("command", { uuid, command, args });
	}

	async kill() {
		await ipcRenderer.invoke("commandKill", { uuid: this.#uuid });
	}

	async waitEnd() {
		await this.#ipc;
	}
}

export default Command;