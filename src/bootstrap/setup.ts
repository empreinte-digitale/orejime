import {setup} from '../core';
import type {Config} from '../ui';
import {deepMerge} from '../ui/utils/objects';
import {
	assertConfigValidity,
	DefaultConfig,
	purposesOnly
} from '../ui/utils/config';
import {once} from '../ui/utils/functions';
import type {UmdGlobal} from './umd';

export default (partialConfig: Config): UmdGlobal => {
	const config = deepMerge(DefaultConfig, partialConfig);
	assertConfigValidity(config);

	const manager = setup(purposesOnly(config.purposes), {
		cookie: config.cookie
	});

	const loadUi = once(() =>
		Promise.all([
			import(
				/* webpackChunkName: "orejime-theme-[request]" */
				`../ui/themes/${config.theme}/index.ts`
			),
			import(
				/* webpackChunkName: "orejime-lang-[request]" */
				`../translations/${config.lang}.yml`
			)
		]).then(([{default: setupTheme}, {default: translations}]) => {
			const fullConfig = deepMerge({translations} as Config, config);
			return setupTheme(fullConfig, manager);
		})
	);

	const showUi = () =>
		loadUi().then((show) => {
			show();
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
		show: showUi
	};
};
