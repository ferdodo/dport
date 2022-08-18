import { CommandWeb } from "./web";
import { CommandElectron } from "./electron";
import { CommandTauri } from "./tauri";

export interface CommandClass {
	new(command: string, args: string[]): CommandInstance;
}

export interface CommandInstance {
	kill(): Promise<void>;
	waitEnd(): Promise<void>;
}

export let Command: CommandClass = CommandWeb;

export async function defineCommandModule(moduleName: "web" | "electron" | "tauri") {
	switch(moduleName) {
		case "web":
			Command = CommandWeb;
			break;
		case "electron":
			Command = CommandElectron;
			break;
		case "tauri":
			Command = CommandTauri;
			break;
		default:
			throw new Error("Unknown module name !");
	}
}
