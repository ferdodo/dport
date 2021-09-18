import { app, BrowserWindow } from "electron";
import initIpc from './lib/command/electron-main';

(async function main() {
	app.allowRendererProcessReuse = false;
	await appReady();
	await createWindow();
	initIpc();
})();

function appReady() {
	return new Promise(function (resolve, reject) {
		const timeout = setTimeout(reject, 5000, "Timeout !");

		app.on("ready", function () {
			clearTimeout(timeout);
			resolve(null);
		});
	});
}

async function createWindow() {
	const win = new BrowserWindow({
		width: 1000,
		height: 300,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
            enableRemoteModule: true
		}
	});

	win.setMenuBarVisibility(false);
	await win.loadFile("dist/index.html");
	return win;
}