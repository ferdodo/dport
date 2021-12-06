import { remote } from "electron";
import { WindowHandleClass, WindowHandleInstance } from ".";

const WindowHandle: WindowHandleClass = class implements WindowHandleInstance {
	#window;

	constructor(){
		this.#window = remote.getCurrentWindow();
	}

	minimize() {
		this.#window.minimize();
	}

	close() {
		this.#window.close();
	}

	static makeDraggable(htmlElement){
		htmlElement.style["-webkit-app-region"] = "drag";
	}
};

export default WindowHandle;
