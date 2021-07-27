import Vue from "vue";
import template from "./template.html";
import "./style.css";

Vue.component("window", {
	template,

	props: {
		title: String
	},

	methods: {
		minimize() {
		},

		close() {
		}
	}
});
