import { WindowHandleWeb } from "./web";

export interface WindowHandleClass {
	new(): WindowHandleInstance;
	makeDraggable(htmlElement: Element): void;
}

export interface WindowHandleInstance {
	minimize(): void;
	close(): void
}

export let WindowHandle: WindowHandleClass = web;

export async function defineModule(moduleName: "web" | "electron" | "tauri") {
	switch(moduleName) {
		case "web":
			WindowHandle = WindowHandleWeb;
			break;

		case "electron":
			WindowHandle = (await import("./electron")).WindowHandleElectron;
			break;

		case "tauri":
			WindowHandle = (await import("./tauri")).WindowHandleTauri;
			break;

		default:
			throw new Error("Unknown module name");
	}
}
