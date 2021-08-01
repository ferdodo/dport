import { RedirectionJson } from "./model";
import { Command } from '@tauri-apps/api/shell';

export function startRedirection(redirection) {
	const args = [
		"-p",
		`${redirection.targetSshPort}`,
		"-L",
		`${redirection.externalPort}:${redirection.internalHost}:${redirection.internalPort}`,
		`${redirection.user}@${redirection.targetHost}`,
		"sleep",
		"infinity"
	];

	const command = new Command('ssh', args);

	async function wrapper(){
		const child = await command.spawn();
		return child;
	}

	const waitSpawn = wrapper();

	return [
		new Promise(function waitRedirectionEnd(resolve){
			command.on('close', function () {
				resolve();
			});
		}),
		async function stopRedirection () {
			const child = await waitSpawn;
			await child.kill();
		}
	]
}