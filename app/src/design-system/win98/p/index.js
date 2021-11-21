import template from './template';
const templateNode = document.createElement('template');
templateNode.innerHTML = template;

export default class Win98P extends HTMLElement {
	get p() {
		return this.shadowRoot.querySelector("p");
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateNode.content.cloneNode(true));
		this.shadowRoot.querySelector("p").innerHTML = this.innerHTML;
	}
}