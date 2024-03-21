const { app, BrowserWindow, ipcMain } = require('electron');

initElectron()
	.catch(console.error);

async function initElectron (){
	try {
		await app.whenReady();
		const win = await createWindow();
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
