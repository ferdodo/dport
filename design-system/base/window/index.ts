export default class DportBaseWindow extends HTMLElement {
	template: HTMLTemplateElement;

	constructor(template: HTMLTemplateElement){
		super();
		this.template = template;
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });

		if (!this.shadowRoot) {
			throw new Error("Failed to attach shadowRoot !");
		}

		const node = this.template.content.cloneNode(true);
		this.shadowRoot.appendChild(node);
		const title = getAttr(this, 'title');
		const handle = getNode(this.shadowRoot, '#handle');
		handle.innerHTML = title;
		const handleId = getAttr(this, 'handle-id');
		handle.id = handleId;
		const minimizeButton = getNode(this.shadowRoot, "#minimize");
		const closeButton = getNode(this.shadowRoot, "#close");

		minimizeButton.onclick = () => {
			const event = new Event('minimize');
			this.dispatchEvent(event);
		};

		closeButton.onclick = () => {
			const event = new Event('close');
			this.dispatchEvent(event);
		};
	}
}

function getNode (shadowRoot: ShadowRoot, query: string) : HTMLElement {
	const node = shadowRoot.querySelector(query) as HTMLElement;

	if (!node){
		throw new Error("Node not found !");
	}

	return node;
}

function getAttr (dportBaseWindow: DportBaseWindow, attrName: string) : string {
	const attr = dportBaseWindow.getAttribute(attrName);

	if (attr == null) {
		throw new Error("Web component is missing attribute !");
	}

	return attr;
}
