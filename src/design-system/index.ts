import InputWin98 from "./win98/input";
import InputNes from "./nes/input";
import InputSpectre from "./spectre/input";
import ButtonWin98 from "./win98/button";
import ButtonNes from "./nes/button";
import ButtonSpectre from "./spectre/button";
import PWin98 from "./win98/p";
import PNes from "./nes/p";
import PSpectre from "./spectre/p";
import WindowWin98 from "./win98/window";
import WindowNes from "./nes/window";
import WindowSpectre from "./spectre/window";

export async function registerComponents(designSystem: "win98" | "spectre" | "nes") {
	switch (designSystem) {
		case "win98":
			customElements.define('dport-input', InputWin98);
			customElements.define('dport-button', ButtonWin98);
			customElements.define('dport-p', PWin98);
			customElements.define('dport-window', WindowWin98);
			break;

		case "spectre":
			customElements.define('dport-input', InputSpectre);
			customElements.define('dport-button', ButtonSpectre);
			customElements.define('dport-p', PSpectre);
			customElements.define('dport-window', WindowSpectre);
			break;

		case "nes":
			customElements.define('dport-input', InputNes);
			customElements.define('dport-button', ButtonNes);
			customElements.define('dport-p', PNes);
			customElements.define('dport-window', WindowNes);
			break;

		default:
			throw new Error("Unknown design system !");
	}
}
