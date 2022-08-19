import { electronIpcDefinition } from "dport/electron-main";
import { BrowserWindow } from "electron";

export function createMinimizeIpcDef(win: BrowserWindow) : electronIpcDefinition {
	return {
		name: "minimize",
		handler() {
			win.minimize();
		}
	}
}

export function createCloseIpcDef(win: BrowserWindow) : electronIpcDefinition {
	return {
		name: "close",
		handler() {
			win.close();
		}
	}
}
