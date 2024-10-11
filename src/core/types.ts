export type PurposeCookieProps = [
	pattern: RegExp,
	path: string,
	domain: string
];

export type PurposeCookie = string | RegExp | PurposeCookieProps;

export interface Purpose {
	id: string;
	isMandatory?: boolean;
	isExempt?: boolean;
	runsOnce?: boolean;
	default?: boolean;
	cookies: PurposeCookie[];
}

export type ConsentsMap = {[id: Purpose['id']]: boolean};

export type CookieOptions = {
	name: string;
	domain?: string;
	duration: number;
	parse: (consents: string) => ConsentsMap;
	stringify: (consents: ConsentsMap) => string;
};
