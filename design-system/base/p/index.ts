export default class extends HTMLElement {
	template: HTMLTemplateElement;

	constructor(template: HTMLTemplateElement){
		super();
		this.template = template;
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });

		if (!this.shadowRoot) {
			throw new Error("Failed to attatch shadowRoot !");
		}

		const node: Node = this.template.content.cloneNode(true);
		this.shadowRoot.appendChild(node);

		const p = this.shadowRoot.querySelector("p");

		if (!p) {
			throw new Error("p node not found !");
		}

		p.innerHTML = this.innerHTML;
	}
}
