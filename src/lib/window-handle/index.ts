import { WindowHandleWeb } from "./web";
import { WindowHandleElectron } from "./electron";
import { WindowHandleTauri } from "./tauri";

export interface WindowHandleClass {
	new(): WindowHandleInstance;
	makeDraggable(htmlElement: Element): void;
}

export interface WindowHandleInstance {
	minimize(): void;
	close(): void
}

export let WindowHandle: WindowHandleClass = WindowHandleWeb;

export async function defineWindowHandleModule(moduleName: "web" | "electron" | "tauri") {
	switch(moduleName) {
		case "web":
			WindowHandle = WindowHandleWeb;
			break;

		case "electron":
			WindowHandle = WindowHandleElectron;
			break;

		case "tauri":
			WindowHandle = WindowHandleTauri;
			break;

		default:
			throw new Error("Unknown module name");
	}
}
