import { ipcRenderer } from "electron";

import { v4 as createUuid } from 'uuid';

export default class Command {
	constructor(command, args){
		const uuid = createUuid();
		this._uuid = uuid;
		this._ipc = ipcRenderer.invoke("command", { uuid, command, args });
	}

	async kill() {
		await ipcRenderer.invoke("commandKill", { uuid: this._uuid });
	}

	async waitEnd() {
		await this._ipc;
	}
}