import template from "./template.html";
import Redirection from "../lib/Redirection.ts";
import Vue from "vue";
import "./style.css";
import { ipcRenderer } from "electron";

var div = document.createElement("div");
div.id = "app";
document.body.appendChild(div);

// https://stackoverflow.com/questions/840781/get-all-non-unique-values-i-e-duplicate-more-than-one-occurrence-in-an-array
const findDuplicates = (arr) => {
	let sorted_arr = arr.slice().sort();
	let results = [];
	for (let i = 0; i < sorted_arr.length - 1; i++) {
		if (sorted_arr[i + 1] == sorted_arr[i]) {
			results.push(sorted_arr[i]);
		}
	}
	return results;
};

new Vue({
	el: "#app",
	template,
	data: () => ({
		redirections: [new Redirection(ipcRenderer)],
		configurationEditor: "",
	}),
	methods: {
		setRedirection(property, index, value) {
			const redirection = this.redirections[index];
			const newRedirection = redirection.setValue(property, value);
			this.redirections = Object.assign([], this.redirections, { [index]: newRedirection });
		},
		startRedirection: async function (index) {
			const redirection = this.redirections[index];
			const startedRedirection = redirection.setStart();
			this.redirections = Object.assign([], this.redirections, { [index]: startedRedirection });
			await startedRedirection.start();
			const stoppedRedirection = startedRedirection.setStop();
			this.redirections = Object.assign([], this.redirections, { [index]: stoppedRedirection });
		},
		stopRedirection: async function (index) {
			const redirection = this.redirections[index];
			await redirection.stop();
		},
		addRedirection: function () {
			const newRedirection = new Redirection(ipcRenderer);
			this.redirections = this.redirections.concat(newRedirection);
		},
		applyConfiguration() {
			const configuration = JSON.parse(this.configurationEditor);

			this.redirections = configuration.map((redirectionJson) => {
				return new Redirection(ipcRenderer)
					.setValue("externalPort", redirectionJson.externalPort)
					.setValue("internalPort", redirectionJson.internalPort)
					.setValue("internalHost", redirectionJson.internalHost)
					.setValue("targetHost", redirectionJson.targetHost)
					.setValue("targetSshPort", redirectionJson.targetSshPort)
					.setValue("user", redirectionJson.user);
			});
		},
	},
	computed: {
		duplicatedExternalPorts() {
			const externalPorts = this.redirections.map((redirection) => redirection.externalPort);
			const duplicates = findDuplicates(externalPorts);
			return Boolean(duplicates.length);
		},
		configuration: function () {
			return this.redirections.map((redirection) => redirection.toJSON());
		},
	},
});
