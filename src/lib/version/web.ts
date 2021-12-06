import { startHotReloadFn, getVersion } from ".";

export const startHotReload: startHotReloadFn = async function (){
	const initialVersion = await getVersion();

	while (true){
		const waitOneSecond = new Promise(r => setTimeout(r, 1000));
		const version = await getVersion();

		if (version !== initialVersion){
			window.location.reload();
		}

		await waitOneSecond;
	}
}
