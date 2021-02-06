import template from "./template.html";
import { default as Redirection, State } from "../lib/redirection";
import Vue from "vue";
import "./style.css";
import { ipcRenderer, clipboard, remote } from "electron";
import { findDuplicates, removeFromArray } from "./utils";

var div = document.createElement("div");
div.id = "app";
document.body.appendChild(div);

new Vue({
	el: "#app",
	template,

	data() {
		const defaultConf = [new Redirection({}, ipcRenderer), new Redirection({}, ipcRenderer).set({externalPort: 8081})];
		const loaded = this.loadConfiguration();

		return {
			redirections: loaded.length ? loaded : defaultConf,
		};
	},

	methods: {
		setRedirection(property, index, value) {
			const redirection = this.redirections[index];
			const newRedirection = redirection.set({[property]: value});
			this.redirections = Object.assign([], this.redirections, { [index]: newRedirection });
		},

		startRedirection: async function (index) {
			const redirection = this.redirections[index];
			const startedRedirection = redirection.set({}, State.Started);
			this.redirections = Object.assign([], this.redirections, { [index]: startedRedirection });
			await startedRedirection.start();
			const stoppedRedirection = startedRedirection.set({}, State.Stopped);
			this.redirections = Object.assign([], this.redirections, { [index]: stoppedRedirection });
		},

		stopRedirection: async function (index) {
			const redirection = this.redirections[index];
			await redirection.stop();
		},

		addRedirection: function () {
			const newRedirection = new Redirection({}, ipcRenderer);
			this.redirections = this.redirections.concat(newRedirection);
		},

		removeRedirection: function (index) {
			this.redirections = removeFromArray(this.redirections, index);
		},

		loadConfiguration() {
			const configuration = JSON.parse(window.localStorage.getItem("configuration")) || [];

			return configuration.map((redirectionJson) => {
				return new Redirection(redirectionJson, ipcRenderer);
			});
		},

		saveConfiguration() {
			const value = JSON.stringify(this.configuration);
			window.localStorage.setItem("configuration", value);
		},

		minimize() {
			const win = remote.getCurrentWindow();
			win.minimize();
		},

		close() {
			const win = remote.getCurrentWindow();
			win.close();
		},
	},
	computed: {
		duplicatedExternalPorts() {
			const externalPorts = this.redirections.map((redirection) => redirection.externalPort);
			const duplicates = findDuplicates(externalPorts);
			return Boolean(duplicates.length);
		},

		configuration: function () {
			return this.redirections.map((redirection) => redirection.json);
		},

		State: ()=> State
	},
	watch: {
		configuration() {
			this.saveConfiguration();
		},
	},
});
