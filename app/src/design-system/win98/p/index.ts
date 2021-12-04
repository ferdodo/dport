import template from './template';
import BaseP from '../../base/p';
const templateNode = document.createElement('template');
templateNode.innerHTML = template;

export default class extends BaseP {
	constructor(){
		super(templateNode);
	}
}
