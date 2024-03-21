import "cookies-ds";
import App from "app";

const target = document.body;

class DportStorage {
	getItem() {
		const value = window.localStorage.getItem('config');

		if (value === null) {
			return null;
		}

		const deserialized = JSON.parse(value);
		return deserialized;
	}

	setItem(value) {
		const serialized = JSON.stringify(value);
		window.localStorage.setItem('config', serialized);
	}
}

class DportWindowHandle {
	static makeDraggable() {
	}

	minimize() {
	}

	close() {
	}
}

const context = new Map([
	['config-storage', new DportStorage()],
	['config-window-handle', DportWindowHandle]
])

new App({ target, context });
