import Input from './win-98/input';
import Button from './win-98/button';
import P from './win-98/p';
import Window from './win-98/window';

export default function registerComponents() {
	customElements.define('dport-input', Input);
	customElements.define('dport-button', Button);
	customElements.define('dport-p', P);
	customElements.define('dport-window', Window);
}