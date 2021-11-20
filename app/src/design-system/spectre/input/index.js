import template from './template';
const templateNode = document.createElement('template');
templateNode.innerHTML = template;

export default class Win98Input extends HTMLElement {
	static get observedAttributes() {
		return ['disabled', 'value'];
	}

	get input() {
		return this.shadowRoot.querySelector("input");
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateNode.content.cloneNode(true));

		for (const attribute of Win98Input.observedAttributes){
			const value = this.getAttribute(attribute);
			this.attributeChangedCallback(attribute, null, value);
		}
	}

	attributeChangedCallback(name, oldValue, newValue){
		if (newValue){
			this.input.setAttribute(name, newValue);
		} else {
			this.input.removeAttribute(name);
		}
	}
}