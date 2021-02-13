import Vue from "vue";
import template from "./template.html";
import { ipcRenderer, remote } from "electron";
import "./style.css";

Vue.component("window", {
	template,

	props: {
		title: String,
	},

	methods: {
		minimize() {
			const win = remote.getCurrentWindow();
			win.minimize();
		},

		close() {
			const win = remote.getCurrentWindow();
			win.close();
		},
	},
});