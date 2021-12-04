import template from './template';
const templateNode = document.createElement('template');
templateNode.innerHTML = template;

export default class SpectreButton extends HTMLElement {
	static get observedAttributes() {
		return ['disabled'];
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateNode.content.cloneNode(true));
		this.button = this.shadowRoot.querySelector("button");

		for (const attribute of SpectreButton.observedAttributes){
			const value = this.getAttribute(attribute);
			this.attributeChangedCallback(attribute, null, value);
		}
	}

	attributeChangedCallback(name, _, newValue){
		if (this.button){
			if (newValue){
				this.button.setAttribute(name, newValue);
			} else {
				this.button.removeAttribute(name);
			}
		}
	}
}
