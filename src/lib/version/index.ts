import { startHotReloadWeb } from "./web";

export async function getVersion() : Promise<string> {
	try {
		const response = await fetch("version");
		return response.text();
	} catch (error) {
		await new Promise(r => setTimeout(r, 1000));
		return getVersion();
	}
}

export type startHotReloadFn = () => Promise<void>;

export let startHotReload: startHotReloadFn = startHotReloadWeb;

export async function defineStartHotReloadModule(moduleName: "web" | "electron" | "tauri") {
	if (moduleName !== "web") {
		startHotReload = () => Promise.resolve(undefined);
	}
}
