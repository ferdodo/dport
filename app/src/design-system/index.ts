import Input from './__DESIGN_SYSTEM__/input';
import Button from './__DESIGN_SYSTEM__/button';
import P from './__DESIGN_SYSTEM__/p';
import Window from './__DESIGN_SYSTEM__/window';

const componentDefinitions = new Map<string, HTMLElement>();

componentDefinitions.set('dport-input', Input);
componentDefinitions.set('dport-button', Button);
componentDefinitions.set('dport-p', P);
componentDefinitions.set('dport-window', Window);

export function registerComponents() {
	for (const [name, element] of componentDefinitions){
		customElements.define(name, element);
	}
}

export function isWebComponent(tagName: string) : boolean {
	for (const t of componentDefinitions.keys()){
		if (t === tagName){
			return true;
		}
	}

	return false;
}
