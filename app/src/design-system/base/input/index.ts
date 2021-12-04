export default class BaseInput extends HTMLElement {
	input: HTMLElement | null = null;
	template: HTMLTemplateElement;

	static get observedAttributes() {
		return ['disabled', 'value'];
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
		this.input = this.shadowRoot.querySelector("input");

		if (!this.input){
			throw new Error("Input node not found !");
		}

		for (const attribute of BaseInput.observedAttributes){
			const value = this.getAttribute(attribute);
			this.attributeChangedCallback(attribute, null, value);
		}

		this.input.addEventListener('change', (e: Event) => {
			const target = <HTMLInputElement> e?.target;

			const event = new CustomEvent('change', {
				detail: target.value
			});

			this.dispatchEvent(event);
		});
	}

	attributeChangedCallback(name, _, newValue) {
		if (this.input) {
			if (newValue) {
				this.input.setAttribute(name, newValue);
			} else {
				this.input.removeAttribute(name);
			}
		}
	}
}
