import uneval, {type Opts} from 'uneval.js';
import {V2Config} from './v2/types';

export const parse = (code: string) => {
	// extracts the outer most object definition, trimming any
	// variable assignment or whitespace.
	const matches = /^[^{]*(\{.*\})[^}]*$/is.exec(code);

	if (!matches) {
		throw new Error();
	}

	const configObject = matches[1];
	let config: Partial<V2Config> = {};

	// eval() will assign the object to the config variable
	// declared above.
	eval(`config = ${configObject}`);

	return config;
};

export const stringify = (object: object, options: Opts = {}) =>
	uneval(object, {
		safe: false,
		...options
	});
