export type JsonParser = (json: string) => any;
export type JsonSerializer = (json: any) => string;

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

export interface Translations {
	consentModal: {
		title: string;
		description: string;
		privacyPolicy: {
			name: string;
			text: string;
		};
	};
	consentBanner: {
		title: string;
		description: string;
		changeDescription: string;
		learnMore: string;
	};
	accept: string;
	acceptTitle: string;
	acceptAll: string;
	save: string;
	saveData: string;
	decline: string;
	declineAll: string;
	close: string;
	enabled: string;
	disabled: string;
	purpose: {
		title: string;
		description: string;
		optOut: {
			title: string;
			description: string;
		};
		required: {
			title: string;
			description: string;
		};
		purposes: string;
		purpose: string;
	};
	poweredBy: string;
	newWindow: string;
	categories?: {
		[name: string]: {
			title: string;
			description: string;
		};
	};
	purposes?: {
		[name: string]: string;
	};
}

export interface Config {
	appElement?: HTMLElement;
	purposes: Purpose[];
	categories?: Category[];
	cookieDomain?: string;
	cookieExpiresAfterDays: number;
	cookieName: string;
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
	translations: {
		[lang: string]: Translations;
	};
}

export interface Consents {
	[appName: string]: boolean;
}

export interface ConsentsWatcher {
	update: (emitter: any, name: string, consents: Consents) => void;
}
