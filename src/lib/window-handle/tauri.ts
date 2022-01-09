import { WindowHandleClass, WindowHandleInstance } from ".";
import { appWindow } from "@tauri-apps/api/window";

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
