import template from './template';
import BaseWindow from '../../base/window';
const templateNode = document.createElement('template');
templateNode.innerHTML = template;

export default class extends BaseWindow {
	constructor(){
		super(templateNode);
	}
}
