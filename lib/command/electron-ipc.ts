import { spawn } from "child_process";
import { electronIpcDefinition } from "dport/electron-main";

const commandHandles = new Map();

export const commandIpc: electronIpcDefinition = {
	name: "command",
	async handler(_, payload: { id: string, command: string, args: string[] }) {
		const { id, command, args } = payload;
		const commandHandle = spawn(command, args);
		commandHandles.set(id, commandHandle);

		await new Promise(resolve => {
			commandHandle.on('close', () => resolve(null));
		});

		commandHandles.delete(id);
	}
};

export const commandKillIpc: electronIpcDefinition = {
	name: "commandKill",
	handler(_, { id }) {
		const command = commandHandles.get(id);
		command.kill();
	}
};
