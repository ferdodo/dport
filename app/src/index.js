import Vue from "vue";
import "../node_modules/98.css/dist/98.css";
import "./style.css";
import Gui from "./components/gui";
import Window from "./components/window";

var div = document.createElement("div");
div.id = "app";
document.body.appendChild(div);

new Vue({
	el: "#app",

	components: {
		Gui,
		Window
	},

	template: '<window title="dport"><gui></gui></window>'
});
