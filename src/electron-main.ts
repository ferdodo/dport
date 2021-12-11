import { app, BrowserWindow, ipcMain } from "electron";
import { commandIpc, commandKillIpc } from 'dport/lib/command/electron-ipc';
import { createMinimizeIpcDef, createCloseIpcDef } from 'dport/lib/window-handle/electron-ipc';

export type electronIpcDefinition = {
	name: string;
	handler: (...any) => void | Promise<void>;
};

initElectron();

async function initElectron (){
	try {
		await app.whenReady();
		const win = await createWindow();
		const minimizeIpc = createMinimizeIpcDef(win);
		const closeIpc = createCloseIpcDef(win);
		registerIpc(minimizeIpc);
		registerIpc(closeIpc);
		registerIpc(commandIpc);
		registerIpc(commandKillIpc);
	} catch (error) {
		console.error(error);
		process.exit(-1);
	}
}

async function createWindow() : Promise<BrowserWindow> {
	const win = new BrowserWindow({
		width: 1000,
		height: 300,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	win.setMenuBarVisibility(false);
	await win.loadFile("index.html");
	return win;
}

function registerIpc(ipc: electronIpcDefinition){
	ipcMain.handle(ipc.name, ipc.handler);
}
