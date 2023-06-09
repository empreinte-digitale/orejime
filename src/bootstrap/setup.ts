import {setup} from '../core';
import type {Config, SetupUi, Translations} from '../ui';
import {
	DefaultConfig,
	assertConfigValidity,
	purposesOnly
} from '../ui/utils/config';
import {once} from '../ui/utils/functions';
import {deepMerge} from '../ui/utils/objects';
import type {UmdGlobal} from './umd';

const importTheme = (theme: string) =>
	import(
		/* webpackChunkName: "orejime-theme-[request]" */
		`../ui/themes/${theme}/index.ts`
	).then((module) => module.default as SetupUi);

const importTranslations = (lang: string) =>
	import(
		/* webpackChunkName: "orejime-lang-[request]" */
		`../translations/${lang}.yml`
	).then((module) => module.default as Translations);

export default (partialConfig: Config): UmdGlobal => {
	const config = deepMerge(DefaultConfig, partialConfig);
	assertConfigValidity(config);

	const manager = setup(purposesOnly(config.purposes), {
		cookie: config.cookie
	});

	const loadUi = once(() =>
		Promise.all([
			importTheme(config.theme),
			importTranslations(config.lang)
		]).then(([setupUi, translations]) => {
			const fullConfig = deepMerge({translations} as Config, config);
			return setupUi(fullConfig, manager);
		})
	);

	const preloadUi = () =>
		loadUi().then(() => {
			// Returning nothing here avoids exposing the internal API.
		});

	const showUi = () =>
		loadUi().then(({openModal}) => {
			openModal();
		});

	manager.on('dirty', (isDirty) => {
		if (isDirty) {
			showUi();
		}
	});

	if (manager.isDirty()) {
		showUi();
	}

	return {
		config,
		manager,
		preload: preloadUi,
		show: showUi
	};
};
