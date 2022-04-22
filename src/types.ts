export type JsonParser = (json: string) => any;
export type JsonSerializer = (json: any) => string;
export type Translate = (
	path: string[],
	variables?: {[name: string]: any}
) => string;

type AppCookie = [
	cookiePattern: RegExp,
	cookiePath: string,
	cookieDomain: string
];

export interface Purpose {
	callback?: (consent: boolean, app: Purpose) => void;
	cookies: Array<string | RegExp | AppCookie>;
	default?: boolean;
	description?: string;
	name: string;
	onlyOnce?: boolean;
	optOut?: boolean;
	purposes?: string[];
	required?: boolean;
	title: string;
}

export interface Category {
	name: string;
	purposes: string[];
	description: string;
	title: string;
}

export interface Config {
	appElement?: HTMLElement;
	purposes: Purpose[];
	categories?: Category[];
	cookieDomain?: string;
	cookieExpiresAfterDays: number;
	cookieName: string;
	debug: boolean;
	default: boolean;
	elementID: string;
	lang: string;
	logo:
		| boolean
		| string
		| {
				alt: string;
				src: string;
		  };
	mustConsent: boolean;
	mustNotice: boolean;
	noBanner?: boolean;
	optOut?: boolean;
	parseCookie: JsonParser;
	poweredBy?: string;
	privacyPolicy: string;
	stringifyCookie: JsonSerializer;
	translations: {};
}

export interface Consents {
	[appName: string]: boolean;
}

export interface ConsentsWatcher {
	update: (emitter: any, name: string, consents: Consents) => void;
}

export type TranslationMap = Map<string, string | TranslationMap>;
export type TranslationObject = {
	[key: string]: string | TranslationObject;
};

export type Translations = TranslationMap | TranslationObject;
