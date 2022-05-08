import {PurposeCookie} from '../types';
import {deleteCookie, getCookieNames} from './cookies';
import escapeRegex from './escapeRegex';

export default (cookies: PurposeCookie[]) => {
	const cookieNames = getCookieNames();

	cookies.forEach((pattern) => {
		let path: string;
		let domain: string;

		if (pattern instanceof Array) {
			[pattern, path, domain] = pattern;
		}

		if (!(pattern instanceof RegExp)) {
			pattern = new RegExp(`^${escapeRegex(pattern)}$`);
		}

		cookieNames
			.filter((name) => (pattern as RegExp).test(name))
			.forEach((cookie) => {
				deleteCookie(cookie, path, domain);
			});
	});
};
