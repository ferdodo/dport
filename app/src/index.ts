import Vue from "vue/dist/vue.common.js";
import Gui from "./components/gui";
import Window from "./components/window";
import store from "./store";
import template from "./template";
import registerComponents from "./design-system/register-components";
import { startHotReload, getVersion } from "./lib/version";
registerComponents();

getVersion()
	.then(console.info)
	.then(startHotReload)
	.catch(console.error);

new Vue({
	el: "#app",
	template,
	store,

	components: {
		Gui,
		Window
	}
});
