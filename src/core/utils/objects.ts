export const diff = <T extends {[k: string | number]: any}>(
	obj1: T,
	obj2: T
): T =>
	Object.entries(obj2).reduce(
		(diff, [key, value]) =>
			value === obj1?.[key] ? diff : {...diff, [key]: value},
		{} as T
	);

export const overwrite = <T>(
	defaults: {[key: string]: T},
	values: {[key: string]: T}
): {[key: string]: T} =>
	Object.keys(defaults).reduce(
		(c, key) => ({
			...c,
			[key]: values[key] ?? defaults[key]
		}),
		{}
	);
