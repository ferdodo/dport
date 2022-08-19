import template from './template';
import BaseInput from '../../base/input';
const templateNode = document.createElement('template');
templateNode.innerHTML = template;

export default class extends BaseInput {
	constructor(){
		super(templateNode);
	}
}
