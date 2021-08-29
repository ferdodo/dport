
export function dbGet(key){
	const valueAsString = window.localStorage.getItem(key);
	return JSON.parse(valueAsString);
}

export function dbSet(key, value) {
	const valueAsString = JSON.stringify(value);
	window.localStorage.setItem(key, valueAsString);
}
