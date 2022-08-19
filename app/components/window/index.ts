import { render } from "./template";
import { WindowHandle } from 'dport/lib/window-handle';
import { onMounted } from "vue/dist/vue.runtime.esm-bundler.js";

export default {
	render,

	props: {
		title: String
	},

	setup() {
		const windowHandle = new WindowHandle();

		onMounted(() => {
			const titleBar: Element = getTitleBar();
			WindowHandle.makeDraggable(titleBar);
		});

		function minimize () {
			windowHandle.minimize();
		}

		function close () {
			windowHandle.close();
		}

		return {
			minimize,
			close
		};
	}
}

function getTitleBar() : Element {
	const dportWindow = window.document.querySelector('dport-window');

	if (!dportWindow){
		throw new Error("dport-window node not found !");
	}

	if (!dportWindow.shadowRoot){
		throw new Error("dport-window has no shadowRoot !");
	}

	const windowTitleBar = dportWindow
		.shadowRoot
		.querySelector('#dport-draggable-handle');

	if (!windowTitleBar){
		throw new Error("Draggable handle node not found !");
	}

	return windowTitleBar;
}
