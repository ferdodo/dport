const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");
const util = require("util");
import Redirection from "./lib/Redirection.ts";
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
		width: 843,
		height: 273,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.setMenuBarVisibility(false);
	win.rezisable = false;
	await win.loadFile("src/electron-renderer/dist/index.html");
	return win;
}

async function handleStartRedirection(event, redirectionJson) {
	if (redirectionCache[redirectionJson.externalPort]) throw new Error("External port is already used !");
	redirectionCache[redirectionJson.externalPort] = new Redirection(redirectionJson);
	await redirectionCache[redirectionJson.externalPort].waitStop();
	delete redirectionCache[redirectionJson.externalPort];
}

async function handleStopRedirection(event, redirectionJson) {
	if (!redirectionCache[redirectionJson.externalPort]) throw new Error("Unknown external port !");
	redirectionCache[redirectionJson.externalPort].stop();
}
