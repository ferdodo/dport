import { createApp } from "vue/dist/vue.runtime.esm-bundler.js";
import Gui from "./components/gui";
import Window from "./components/window";
import { render } from "./template";
import { registerComponents } from "dport/design-system";
import { startHotReload, getVersion } from "dport/lib/version";
import "dport/lib/config/constants";

getVersion()
	.then(console.info)
	.then(startHotReload)
	.catch(console.error);

const app = createApp({
	render,

	components: {
		Gui,
		Window
	}
});

registerComponents(DPORT_DESIGN_SYSTEM)
	.then(function() {
		app.mount('body');
	})
	.catch(console.error);
