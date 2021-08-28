import { appWindow as tauriAppWindow } from '@tauri-apps/api/window';

export default class WindowHandleTauri {
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
		return new WindowHandleTauri(tauriAppWindow);
	}

	static makeDraggable(htmlElement){
		htmlElement.setAttribute("data-tauri-drag-region", true);
	}
}