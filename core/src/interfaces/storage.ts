export interface StorageClass<T> {
	new(): StorageInstance<T>;
}

export interface StorageInstance<T> {
	getItem(): T | null;
	setItem(value: T): void;
}
