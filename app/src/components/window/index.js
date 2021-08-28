import Vue from "vue";
import template from "./template.html";
import "./style.css";
import WindowHandle from '../../lib/window-handle';

export default {
	template,

	props: {
		title: String
	},

	data(){
		const windowHandle = WindowHandle.getMainWindow();
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