export default class BaseButton extends HTMLElement {
	button: HTMLElement | null = null;
	template: HTMLTemplateElement;

	static get observedAttributes() {
		return ['disabled'];
	}

	constructor(template: HTMLTemplateElement){
		super();
		this.template = template;
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });

		if (!this.shadowRoot){
			throw new Error("Failed to attach shadowRoot !");
		}

		this.shadowRoot.appendChild(this.template.content.cloneNode(true));
		this.button = this.shadowRoot.querySelector("button");

		if (!this.button){
			throw new Error("Button node not found !");
		}

		this.button.addEventListener('click', () => {
			const event = new CustomEvent('btn-click');
			this.dispatchEvent(event);
		});

		for (const attribute of BaseButton.observedAttributes){
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
