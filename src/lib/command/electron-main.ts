import { spawn } from "child_process";
import { ipcMain } from "electron";
const commandHandles = new Map();

export default function initIpc(){
	ipcMain.handle("command", handleCommand);
	ipcMain.handle("commandKill", handleCommandKill);
}

interface handleCommandPayload {
	id: string;
	command: string;
	args: string[];
};

async function handleCommand(_, { id, command, args }: handleCommandPayload){
	const commandHandle = spawn(command, args);
	commandHandles.set(id, commandHandle);

	await new Promise(resolve => {
		commandHandle.on('close', () => resolve(null));
	});

	commandHandles.delete(id);
}

function handleCommandKill(_, { id }){
	const command = commandHandles.get(id);
	command.kill();
}
