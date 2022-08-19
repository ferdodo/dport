
export function dbGet(key: string) {
	const valueAsString = window.localStorage.getItem(key);
	return valueAsString ? JSON.parse(valueAsString) : null;
}

export function dbSet(key: string, value) {
	const valueAsString = JSON.stringify(value);
	window.localStorage.setItem(key, valueAsString);
}
