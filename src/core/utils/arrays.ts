// Same behavior as `[].every()`, but returns false when the array is empty.
export const every = <T>(array: T[], predicate: (element: T) => boolean) =>
	array.length ? array.every(predicate) : false;

export const withoutAll = <T>(array: T[], unwanted: T[]) =>
	array.filter((value) => !unwanted.includes(value));

export const indexBy = <T>(array: T[], key: keyof T) =>
	Object.fromEntries(array.map((obj) => [obj[key], obj]));
