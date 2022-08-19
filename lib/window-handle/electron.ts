import { ipcRenderer } from "electron";
import { WindowHandleClass, WindowHandleInstance } from ".";

export const WindowHandleElectron: WindowHandleClass = class implements WindowHandleInstance {
	minimize() {
		return ipcRenderer.invoke('minimize');
	}

	close() {
		return ipcRenderer.invoke('close');
	}

	static makeDraggable(htmlElement){
		htmlElement.style["-webkit-app-region"] = "drag";
	}
};
