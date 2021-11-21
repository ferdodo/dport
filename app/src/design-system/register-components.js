import Input from './__DESIGN_SYSTEM__/input';
import Button from './__DESIGN_SYSTEM__/button';
import P from './__DESIGN_SYSTEM__/p';
import Window from './__DESIGN_SYSTEM__/window';

export default function registerComponents() {
	customElements.define('dport-input', Input);
	customElements.define('dport-button', Button);
	customElements.define('dport-p', P);
	customElements.define('dport-window', Window);
}
