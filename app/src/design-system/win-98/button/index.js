import template from './template';
const templateNode = document.createElement('template');
templateNode.innerHTML = template;

export default class Win98Button extends HTMLElement {
	static get observedAttributes() {
		return ['disabled'];
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateNode.content.cloneNode(true));
		this.button = this.shadowRoot.querySelector("button");
		this.button.innerHTML = this.innerHTML;

		for (const attribute of Win98Button.observedAttributes){
			const value = this.getAttribute(attribute);
			this.attributeChangedCallback(attribute, null, value);
		}
	}

	attributeChangedCallback(name, oldValue, newValue){
		if (this.button){		
			if (newValue){
				this.button.setAttribute(name, newValue);
			} else {
				this.button.removeAttribute(name);
			}
		}
	}
}