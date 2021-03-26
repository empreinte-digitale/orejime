export type JsonParser = (json: string) => any;
export type JsonSerializer = (json: any) => string;
export type CssNamespace = (className: string) => string;
export type Translate = (path: string[]) => string;

type AppCookie = [
	cookiePattern: RegExp,
	cookiePath: string,
	cookieDomain: string
];

export interface App {
	callback: (consent: boolean, app: App) => void;
	cookies: Array<string | RegExp | AppCookie>;
	default: boolean;
	description: string;
	name: string;
	onlyOnce: boolean;
	optOut: boolean;
	purposes: string[];
	required: boolean;
	title: string;
}

export interface Category {
	apps: string[];
	description: string;
	title: string;
}

export interface Config {
	appElement?: HTMLElement;
	apps: App[];
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
	noNotice?: boolean;
	optOut?: boolean;
	parseCookie: JsonParser;
	poweredBy?: string;
	privacyPolicy: string;
	stringifyCookie: JsonSerializer;
	stylePrefix: string;
	translations: {};
}

export interface Consents {
	[appName: string]: boolean;
}

export interface ConsentsWatcher {
	update: (emitter: any, name: string, consents: Consents) => void;
}

export type Translations = {
	[key: string]: string | Translations;
};
