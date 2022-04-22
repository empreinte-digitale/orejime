type DeepObject = {
	[key: string]: DeepObject | any
}

const isObject = (obj: any) => obj && typeof obj === 'object';

// @see https://stackoverflow.com/a/48218209/2391359
export const deepMerge = <T extends DeepObject, K extends keyof T>(...objects: T[]): T => {
	return objects.reduce((object, current) => {
		(Object.keys(current) as K[]).forEach((key) => {
			const previousValue = object[key];
			const value = current[key];

			if (Array.isArray(previousValue) && Array.isArray(value)) {
				object[key] = previousValue.concat(...value as any[]);
			} else if (isObject(previousValue) && isObject(value)) {
				object[key] = deepMerge(previousValue, value);
			} else {
				object[key] = value;
			}
		});

		return object;
	}, {} as T);
};
