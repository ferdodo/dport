import { createApp } from "vue/dist/vue.runtime.esm-bundler.js";
import Gui from "./components/gui";
import Window from "./components/window";
import { render } from "./template";
import { registerComponents } from "dport/design-system";
import { startHotReload, getVersion } from "dport/lib/version";

registerComponents();

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

app.mount('body');
