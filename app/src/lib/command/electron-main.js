import { spawn } from "child_process";
import { ipcMain } from "electron";

const commandHandles = new Map();

export default function initIpc(){
	ipcMain.handle("command", handleCommand);
	ipcMain.handle("commandKill", handleCommandKill);
}

async function handleCommand(_, { uuid, command, args }){
	const commandHandle = spawn(command, args);
	commandHandles.set(uuid, commandHandle);

	await new Promise(resolve => {
		commandHandle.on('close', () => resolve());
	});

	commandHandles.delete(uuid);
}

async function handleCommandKill(_, { uuid }){
	const command = commandHandles.get(uuid);
	command.kill();
	await Promise.resolve();
}