const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");
const util = require("util");
const Redirection = require("./lib/Redirection.ts");
const path = require("path");
const redirectionCache = {};

(async function main() {
	try {
		app.allowRendererProcessReuse = false;
		await appReady();
		var win = await createWindow();
		ipcMain.handle("startRedirection", handleStartRedirection);
		ipcMain.handle("stopRedirection", handleStopRedirection);
	} catch (error) {
		console.error(error);
		process.exit(-1);
	}
})();

function appReady() {
	return new Promise(function (resolve, reject) {
		var timeout = setTimeout(reject, 5000, "Timeout !");

		app.on("ready", function () {
			clearTimeout(timeout);
			resolve();
		});
	});
}

async function createWindow() {
	var win = new BrowserWindow({
		width: 730,
		height: 260,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.setMenuBarVisibility(false);
	win.rezisable = false;
	await win.loadFile("electron-renderer/dist/index.html");
	return win;
}

async function handleStartRedirection(event, { externalPort, internalPort, internalHost, targetHost, targetSshPort, user }) {
	if (redirectionCache[externalPort]) throw new Error("External port is already used !");
	redirectionCache[externalPort] = new Redirection(externalPort, internalPort, internalHost, targetHost, targetSshPort, user);
	await redirectionCache[externalPort].waitStop();
	delete redirectionCache[externalPort];
}

async function handleStopRedirection(event, { externalPort }) {
	if (!redirectionCache[externalPort]) throw new Error("Unknown external port !");
	redirectionCache[externalPort].stop();
}
