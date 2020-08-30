// https://stackoverflow.com/questions/840781/get-all-non-unique-values-i-e-duplicate-more-than-one-occurrence-in-an-array
export function findDuplicates(arr) {
	let sorted_arr = arr.slice().sort();
	let results = [];
	for (let i = 0; i < sorted_arr.length - 1; i++) {
		if (sorted_arr[i + 1] == sorted_arr[i]) {
			results.push(sorted_arr[i]);
		}
	}
	return results;
}

// https://stackoverflow.com/questions/40737482/immutable-change-elements-in-array-with-slice-no-splice
export function removeFromArray(arr, index) {
	const begin = arr.slice(0, index);
	const end = arr.slice(index + 1);
	return begin.concat(end);
}
