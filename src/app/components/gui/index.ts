import { render } from "./template";
import useConfig from "dport/app/composable/use-config";

export default {
	render,
	setup: () => useConfig()
};
