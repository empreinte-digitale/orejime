import setup, {type OrejimeInstance} from './setup';
import type {Config, Translations} from './ui';
import {type Theme} from './ui/components/types/Theme';

export type OrejimeConstructor = (config: Partial<UmdConfig>) => Promise<OrejimeInstance>;

export interface Orejime {
	init: OrejimeConstructor
}

export interface UmdConfig extends Omit<Config, 'theme'> {
	theme: 'orejime' | 'dsfr'
}

declare global {
	interface Window {
		orejimeConfig: Partial<UmdConfig>;
		orejime: OrejimeInstance;
		Orejime: Orejime
	}
}

const importTheme = (theme: UmdConfig['theme'] = 'orejime') =>
	import(
		/* webpackChunkName: "orejime-theme-[request]" */
		`./ui/themes/${theme}/index.ts`
	).then((module) => module.default as Theme);

const importTranslations = (lang = 'en') =>
	import(
		/* webpackChunkName: "orejime-lang-[request]" */
		`./translations/${lang}.ts`
	).then((module) => module.default as Translations);

const init: OrejimeConstructor = (config) =>
	Promise.all([
		importTheme(config.theme),
		importTranslations(config.lang)
	]).then(([theme, translations]) => {
		const orejime = setup({
			...config,
			theme,
			translations
		});

		// As Orejime is loaded asynchronously, we're
		// emitting an event to let potential listeners
		// know when it is done loading.
		if (typeof CustomEvent !== 'undefined') {
			document.dispatchEvent(
				new CustomEvent('orejime.loaded', {
					detail: orejime
				})
			);
		}

		return orejime;
	});

const autoload = async () => {
	window.Orejime = {
		init
	};

	if (
		window.orejimeConfig !== undefined &&
		// `window.orejime instanceof Element` means there is a #orejime div in the dom
		(window.orejime === undefined || window.orejime instanceof Element)
	) {
		window.orejime = await init(window.orejimeConfig);
	}
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', autoload);
} else {
	autoload();
}
