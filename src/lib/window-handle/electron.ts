import { ipcRenderer } from "electron";
import { WindowHandleClass, WindowHandleInstance } from ".";

const WindowHandle: WindowHandleClass = class implements WindowHandleInstance {
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

export default WindowHandle;
