import Vue from "vue/dist/vue.common.js";
import Gui from "./components/gui";
import Window from "./components/window";
import store from "./store";
import template from "./template";
import registerComponents from "./design-system/register-components";
registerComponents();

new Vue({
	el: "#app",
	template,
	store,

	components: {
		Gui,
		Window
	}
});