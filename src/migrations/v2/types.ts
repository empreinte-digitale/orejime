export interface V2Translations {
	consentModal: {
		title: string;
		description: string;
		privacyPolicy: {
			name: string;
			text: string;
		};
	};
	consentNotice: {
		title?: string;
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
	app: {
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
	[key: string]: any;
}

export interface V2Consents {
	[name: string]: boolean;
}

export interface V2App {
	name: string;
	title: string;
	description: string;
	cookies: string[];
	purposes: string[];
	callback: (consent: boolean, app: V2App) => void;
	required: boolean;
	optOut: boolean;
	default: boolean;
	onlyOnce: boolean;
}

export interface V2Category {
	name: string;
	title: string;
	description: string;
	apps: string[];
}

export interface V2Config {
	elementID: string;
	appElement: string;
	stylePrefix: string;
	cookieName: string;
	cookieExpiresAfterDays: 365;
	cookieDomain: undefined;
	stringifyCookie: (consents: V2Consents) => string;
	parseCookie: (consents: string) => V2Consents;
	privacyPolicy: string;
	default: boolean;
	mustConsent: boolean;
	mustNotice: boolean;
	logo: boolean;
	lang: string;
	translations: Record<string, V2Translations>;
	apps: V2App[];
	categories: V2Category[];
	debug: boolean;
}
