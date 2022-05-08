import {CookieOptions, Purpose as CorePurpose} from '../core';

export interface Purpose extends CorePurpose {
	id: string;
	title: string;
	description?: string;
}

export interface PurposeGroup {
	id: string;
	title: string;
	description?: string;
	purposes: Purpose[];
}

export type PurposeList = Array<PurposeGroup | Purpose>;

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
	purposes: PurposeList;
	cookie?: CookieOptions;
	lang: string;
	logo?: ImageDescriptor;
	forceBanner: boolean;
	forceModal: boolean;
	privacyPolicyUrl: string;
	translations: Translations;
}
