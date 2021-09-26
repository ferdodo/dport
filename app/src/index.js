import Vue from "vue";
import "98.css";
import "./style.css";
import Gui from "./components/gui";
import Window from "./components/window";
import store from "./store";
import template from "./template.html";

new Vue({
	el: "#app",
	template,
	store,

	components: {
		Gui,
		Window
	}
});

console.log(BUILD_INFO);