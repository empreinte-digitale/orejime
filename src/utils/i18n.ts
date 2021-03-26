import {Translations} from '../types';
import {getDeep} from './objects';

// temporary fix to avoid touching the code for now
declare global {
	interface Window {
		language: string;
	}
}

export function language() {
	return window.language || document.documentElement.lang || 'en';
}

export function t(
	translations: Translations,
	lang: string,
	debug: boolean,
	path: string[]
) {
	const value = getDeep<string>(translations, [lang, ...path]);

	if (debug && value === undefined) {
		console.log(`[missing translation: ${lang}/${path.join('.')}]`);
	}

	return value;
}
