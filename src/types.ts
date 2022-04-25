export type JsonParser = (json: string) => any;
export type JsonSerializer = (json: any) => string;

type AppCookie = [
	cookiePattern: RegExp,
	cookiePath: string,
	cookieDomain: string
];

export interface Purpose {
	id: string;
	title: string;
	description?: string;
	isMandatory?: boolean;
	isExempt?: boolean;
	runsOnce?: boolean;
	default?: boolean;
	purposes?: string[];
	cookies: Array<string | RegExp | AppCookie>;
	callback?: (consent: boolean, app: Purpose) => void;
}

export interface Category {
	id: string;
	purposes: string[];
	description: string;
	title: string;
}

export interface BannerTranslations {
	title?: string;
	description: string;
	privacyPolicyLabel: string;
	accept: string;
	acceptTitle?: string;
	decline: string;
	declineTitle?: string;
	configure: string;
	configureTitle?: string;
}

export interface ModalTranslations {
	title: string;
	description: string;
	privacyPolicyLabel: string;
	close: string;
	closeTitle: string;
	globalPreferences: string;
	acceptAll: string;
	declineAll: string;
	save: string;
	saveTitle: string;
}

export interface PurposeTranslations {
	mandatory: string;
	mandatoryTitle: string;
	exempt: string;
	exemptTitle: string;
	showMore: string;
	accept: string;
	decline: string;
	purposes: string;
	purpose: string;
	enabled: string;
	disabled: string;
}

export interface MiscTranslations {
	newWindowTitle: string;
	updateNeeded: string;
	poweredBy: string;
}

export interface Translations {
	banner: BannerTranslations;
	modal: ModalTranslations;
	purpose: PurposeTranslations;
	misc: MiscTranslations;
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

export type ElementReference = string | HTMLElement;

export type ImageAttributes = {
	src: string;
	alt: string;
};

export type ImageDescriptor = string | ImageAttributes;

export interface Config {
	orejimeElement?: ElementReference;
	appElement?: ElementReference;
	purposes: Purpose[];
	categories?: Category[];
	cookieDomain?: string;
	cookieExpiresAfterDays: number;
	cookieName: string;
	lang: string;
	logo?: ImageDescriptor;
	forceBanner: boolean;
	forceModal: boolean;
	parseCookie: JsonParser;
	privacyPolicy: string;
	stringifyCookie: JsonSerializer;
	translations: {
		[lang: string]: Translations;
	};
}

export interface Consents {
	[purposeId: string]: boolean;
}

export interface ConsentsWatcher {
	update: (emitter: any, id: string, consents: Consents) => void;
}
