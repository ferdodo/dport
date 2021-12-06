import { createApp } from "vue/dist/vue.cjs.js";
import Gui from "./components/gui";
import Window from "./components/window";
import store from "./store";
import template from "./template";
import { registerComponents, isWebComponent } from "dport/design-system";
import { startHotReload, getVersion } from "dport/lib/version";

registerComponents();

getVersion()
	.then(console.info)
	.then(startHotReload)
	.catch(console.error);

const app = createApp({
	template,

	components: {
		Gui,
		Window
	}
});

app.use(store);
app.config.compilerOptions.isCustomElement = isWebComponent;
app.mount('body');
