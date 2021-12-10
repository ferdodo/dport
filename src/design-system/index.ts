import Input from './__DESIGN_SYSTEM__/input';
import Button from './__DESIGN_SYSTEM__/button';
import P from './__DESIGN_SYSTEM__/p';
import Window from './__DESIGN_SYSTEM__/window';

const componentDefinitions = new Map()
	.set('dport-input', Input)
	.set('dport-button', Button)
	.set('dport-p', P)
	.set('dport-window', Window);

export function registerComponents() {
	for (const [name, element] of componentDefinitions){
		customElements.define(name, element);
	}
}
