import { remote } from "electron";

export default class WindowHandleElectron {
	constructor(appWindow){
		this.window = appWindow;
	}

	minimize() {
		this.window.minimize();
	}

	close() {
		this.window.close();
	}

	static getMainWindow(){
		const appWindow = remote.getCurrentWindow();
		return new WindowHandleElectron(appWindow);
	}

	static makeDraggable(htmlElement){
		htmlElement.style["-webkit-app-region"] = "drag";
	}
}