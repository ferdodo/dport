import "cookies-ds";
import App from "app";
import { ipcRenderer } from "electron";
import { currentConfig$, mapCurrentCommands } from "core";

const target = document.body;

let idSeed = 0

currentConfig$.pipe(
	mapCurrentCommands(
		class Command {
			id;
			ipc;

			constructor(command, args) {
				this.id = idSeed;
				idSeed++;
				this.ipc = ipcRenderer.invoke("command", { id: this.id, command, args });
			}

			async kill() {
				await ipcRenderer.invoke("commandKill", { id: this.id });
			}

			async waitEnd() {
				await this.ipc;
			}
		}
	)
).subscribe();

class DportStorage {
	getItem() {
		const value = window.localStorage.getItem('config');

		if (value === null) {
			return null;
		}

		const deserialized = JSON.parse(value);
		return deserialized;
	}

	setItem(value) {
		const serialized = JSON.stringify(value);
		window.localStorage.setItem('config', serialized);
	}
}

class DportWindowHandle {
	static makeDraggable(htmlElement) {
		htmlElement.style["-webkit-app-region"] = "drag";
	}

	minimize() {
		return ipcRenderer.invoke('minimize');

	}

	close() {
		return ipcRenderer.invoke('close');
	}
}

const context = new Map([
	['config-storage', new DportStorage()],
	['config-window-handle', DportWindowHandle]
])

new App({ target, context });
