import template from './template';
import BaseButton from '../../base/button';
const templateNode = document.createElement('template');
templateNode.innerHTML = template;

export default class extends BaseButton {
	constructor(){
		super(templateNode);
	}
}