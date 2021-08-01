import template from "./template.html";
import { default as Redirection, State} from "../../lib/redirection";
import Vue from "vue";
import "./style.css";
import { findDuplicates, removeFromArray } from "./utils";

Vue.component("gui", {
	template,

	data() {
		const defaultConf = [new Redirection(), new Redirection().set({ externalPort: 8081 })];
		const loaded = this.loadConfiguration();

		return {
			redirections: loaded.length ? loaded : defaultConf,
			State
		};
	},

	methods: {
		setRedirection(property, index, value) {
			const redirection = this.redirections[index];
			const newRedirection = redirection.set({ [property]: value });
			this.redirections = Object.assign([], this.redirections, { [index]: newRedirection });
		},

		async startRedirection (index) {
			this.redirections = Object.assign([], this.redirections, { 
				[index]: this.redirections[index].set({ state: State.Started })
			});

			this.redirections = Object.assign([], this.redirections, { 
				[index]: await this.redirections[index].waitEnd()
			});
		},

		async stopRedirection(index) {
			this.redirections = Object.assign([], this.redirections, { 
				[index]: await this.redirections[index].stop()
			});
		},

		addRedirection () {
			this.redirections = this.redirections.concat(new Redirection());
		},

		removeRedirection (index) {
			this.redirections = removeFromArray(this.redirections, index);
		},

		loadConfiguration() {
			const configuration = JSON.parse(window.localStorage.getItem("configuration")) || [];
			return configuration.map(props => new Redirection(props));
		},

		saveConfiguration() {
			const value = JSON.stringify(this.configuration);
			window.localStorage.setItem("configuration", value);
		}
	},
	computed: {
		duplicatedExternalPorts() {
			const externalPorts = this.redirections.map((redirection) => redirection.externalPort);
			const duplicates = findDuplicates(externalPorts);
			return Boolean(duplicates.length);
		},

		configuration () {
			return this.redirections.map((redirection) => ({ 
				...redirection.json, 
				state: State.Stopped 
			}));
		}
	},
	watch: {
		configuration() {
			this.saveConfiguration();
		}
	}
});
