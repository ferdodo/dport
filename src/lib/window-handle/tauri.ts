import { WindowHandleClass, WindowHandleInstance } from ".";
import { appWindow } from "@tauri-apps/api/window";

const WindowHandle: WindowHandleClass = class implements WindowHandleInstance {
	minimize() {
		appWindow
			.minimize()
			.catch(console.error);
	}

	close() {
		appWindow
			.close()
			.catch(console.error);
	}

	static makeDraggable(htmlElement) {
		htmlElement.addEventListener('mousedown', () => {
			appWindow
				.startDragging()
				.catch(console.error);
		});
	}
};

export default WindowHandle;
