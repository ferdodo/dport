import template from "./template.html";
import "./style.css";
import WindowHandle from '../../lib/window-handle';

export default {
	template,

	props: {
		title: String
	},

	data(){
		const windowHandle = new WindowHandle();
		return { windowHandle };
	},

	mounted(){
		WindowHandle.makeDraggable(this.$refs.dportDraggableHandle)
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