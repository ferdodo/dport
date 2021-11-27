import { WindowHandleClass, WindowHandleInstance } from "./index";

const WindowHandle: WindowHandleClass = class implements WindowHandleInstance {
	#window;

	constructor(){
	}

	minimize() {
	}

	close() {
	}

	static makeDraggable(htmlElement){
	}
};

export default WindowHandle;
