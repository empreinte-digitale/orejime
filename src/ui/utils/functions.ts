export const once = <T>(fn: () => T): (() => T) => {
	let done = false;
	let result: T;

	return () => {
		if (!done) {
			result = fn();
			done = true;
		}

		return result;
	};
};
