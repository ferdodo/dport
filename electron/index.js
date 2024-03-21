const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require("child_process");

initElectron()
	.catch(console.error);

const commandHandles = new Map();

async function initElectron (){
	try {
		await app.whenReady();
		const win = await createWindow();
		ipcMain.handle('minimize', () => win.minimize());
		ipcMain.handle('close', () => win.close());

		ipcMain.handle('command', async function(event, { id, command, args }) {
			const commandHandle = spawn(command, args);
			commandHandles.set(id, commandHandle);

			await new Promise(resolve => {
				commandHandle.on('close', () => resolve(null));
			});

			commandHandles.delete(id);
		});

		ipcMain.handle('commandKill', function(event, { id }) {
			const command = commandHandles.get(id);
			command.kill();
		});
	} catch (error) {
		console.error(error);
		process.exit(-1);
	}
}

async function createWindow() {
	const win = new BrowserWindow({
		width: Number(800),
		height: Number(600),
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	win.setMenuBarVisibility(false);
	await win.loadFile("../index.html");
	return win;
}
