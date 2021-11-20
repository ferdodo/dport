import { WindowHandleClass, WindowHandleInstance } from "./index";
import { appWindow } from "./tauri-app-window";

const WindowHandle: WindowHandleClass = class implements WindowHandleInstance {
	minimize() {
		appWindow.minimize();
	}

	close() {
		appWindow.close();
	}

	static makeDraggable(htmlElement) {
		htmlElement.addEventListener('mousedown', () => {
			appWindow.startDragging();
		});
	}
};

export default WindowHandle;
