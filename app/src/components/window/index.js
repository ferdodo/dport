import template from "./template";
import WindowHandle from '../../lib/window-handle';

export default {
	template,

	props: {
		title: String
	},

	data() {
		const windowHandle = new WindowHandle();
		return { windowHandle };
	},

	mounted() {
		const dportWindow = window.document.querySelector('dport-window');

		if (!dportWindow){
			throw new Error("dport-window node not found !");
		}

		const windowTitleBar = dportWindow.shadowRoot.querySelector('#dport-draggable-handle');

		if (!windowTitleBar){
			throw new Error("Draggable handle node not found !");
		}

		WindowHandle.makeDraggable(windowTitleBar);
	},
	
	methods: {
		minimize() {
			this.windowHandle.minimize();
		},

		close() {
			this.windowHandle.close();
		}
	}
}
