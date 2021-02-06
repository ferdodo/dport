import Vue from "vue";
import "../../node_modules/98.css/dist/98.css";
import "./main.css";
import "./components/gui";
import "./components/window";

var div = document.createElement("div");
div.id = "app";
document.body.appendChild(div);

new Vue({
	el: "#app",
	template: '<window title="dport"><gui></gui></window>'
});