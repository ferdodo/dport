import { WindowHandleClass, WindowHandleInstance } from "./index";
import { tauriAppWindow } from './resolve-module';

const WindowHandle: WindowHandleClass = class implements WindowHandleInstance {
	#window;

	constructor(){
		this.#window = tauriAppWindow;
	}

	minimize() {
		this.#window.minimize();
	}

	close() {
		this.#window.close();
	}

	static makeDraggable(htmlElement){
		htmlElement.setAttribute("data-tauri-drag-region", true);
	}
};

export default WindowHandle;