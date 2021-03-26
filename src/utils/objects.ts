interface DeepObject<T> {
	[key: string]: T | DeepObject<T>;
}

export function getDeep<T>(
	map: DeepObject<T>,
	path: string[],
	defaultValue?: T
): T {
	let value: T | DeepObject<T> = map;

	for (const key of path) {
		if (!(key in value)) {
			return defaultValue;
		}

		value = (value as DeepObject<T>)[key];
	}

	return value as T;
}
