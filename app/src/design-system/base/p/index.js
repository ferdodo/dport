export default class extends HTMLElement {
	constructor(templateNode){
		super();
		this.templateNode = templateNode;
	}

	get p() {
		return this.shadowRoot.querySelector("p");
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(this.templateNode.content.cloneNode(true));
		this.shadowRoot.querySelector("p").innerHTML = this.innerHTML;
	}
}
