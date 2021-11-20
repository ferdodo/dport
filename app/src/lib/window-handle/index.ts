export interface WindowHandleClass {
	new(): WindowHandleInstance;
	makeDraggable(htmlElement): void;
}

export interface WindowHandleInstance {
	minimize(): void;
	close(): void
}

export { default } from "./__BUNDLER__";