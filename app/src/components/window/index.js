import Vue from "vue";
import template from "./template.html";
import "./style.css";
import { appWindow } from '@tauri-apps/api/window';

export default {
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
}