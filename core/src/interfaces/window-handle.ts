export interface WindowHandleClass {
	new(): WindowHandleInstance;
	makeDraggable(htmlElement: Element): void;
}

export interface WindowHandleInstance {
	minimize(): void;
	close(): void
}
