export async function getVersion() : Promise<string> {
	try {
		const response = await fetch("/version", { cache: "no-cache"});
		return response.text();
	} catch (error) {
		await new Promise(r => setTimeout(r, 1000));
		return getVersion();
	}
}

export type startHotReloadFn = () => Promise<void>;
export { startHotReload } from "./__BUNDLER__";
