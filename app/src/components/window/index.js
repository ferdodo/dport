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
		const windowTitleBar = dportWindow.shadowRoot.querySelector('#dport-draggable-handle');
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
