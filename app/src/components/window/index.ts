import template from "./template";
import WindowHandle from '../../lib/window-handle';
import { ref, onMounted } from "vue/dist/vue.cjs.js";

export default {
	template,

	props: {
		title: String
	},

	setup() {
		const windowHandle = ref(new WindowHandle());

		onMounted(() => {
			const titleBar: Element = getTitleBar();
			WindowHandle.makeDraggable(titleBar);
		});

		return {
			windowHandle
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
