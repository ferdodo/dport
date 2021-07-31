import Vue from "vue";
import template from "./template.html";
import "./style.css";
import { appWindow } from '@tauri-apps/api/window';

Vue.component("window", {
	template,

	props: {
		title: String
	},

	methods: {
		minimize() {
			appWindow.minimize();
		},

		close() {
			appWindow.close();
		}
	}
});
