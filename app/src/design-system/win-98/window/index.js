import template from './template';
const templateNode = document.createElement('template');
templateNode.innerHTML = template;

export default class Win98Window extends HTMLElement {
	get handle(){
		return this.shadowRoot.querySelector(".title-bar-text");
	}

	get minimizeButton(){
		return this.shadowRoot.querySelector("#minimize");
	}

	get closeButton(){
		return this.shadowRoot.querySelector("#close");
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateNode.content.cloneNode(true));
		const title = this.getAttribute('title');
		
		if (title){
			this.handle.innerHTML = title;
		}

		const handleId = this.getAttribute('handle-id');

		if (handleId){
			this.handle.id = handleId;
		}

		this.minimizeButton.onclick = () => {
			const event = new Event('minimize')
			this.dispatchEvent(event);
		}

		this.closeButton.onclick = () => {
			const event = new Event('close');
			this.dispatchEvent(event);
		}
	}
}