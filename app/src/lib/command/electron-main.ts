import { spawn } from "child_process";
import { ipcMain } from "electron";
const commandHandles = new Map();

export default function initIpc(){
	ipcMain.handle("command", handleCommand);
	ipcMain.handle("commandKill", handleCommandKill);
}

interface handleCommandPayload { 
	uuid: string;
	command: string;
	args: string[];
};

async function handleCommand(_, { uuid, command, args }: handleCommandPayload){
	const commandHandle = spawn(command, args);
	commandHandles.set(uuid, commandHandle);

	await new Promise(resolve => {
		commandHandle.on('close', () => resolve(null));
	});

	commandHandles.delete(uuid);
}

function handleCommandKill(_, { uuid }){
	const command = commandHandles.get(uuid);
	command.kill();
}