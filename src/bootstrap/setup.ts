import {setup} from '../core';
import type {Config} from '../ui';
import {deepMerge} from '../ui/utils/objects';
import {purposesOnly} from '../ui/utils/config';
import {once} from '../ui/utils/functions';

export default (config: Config) => {
	const manager = setup(purposesOnly(config.purposes), {
		cookie: config.cookie
	});

	const loadUi = once(() =>
		Promise.all([
			import(
				/* webpackChunkName: "orejime-ui" */
				'../ui'
			),
			import(
				/* webpackChunkName: "orejime-lang-[request]" */
				`../translations/${config.lang}.yml`
			)
		]).then(([ui, translations]) => {
			const fullConfig = deepMerge({translations} as Config, config);
			return ui.setup(fullConfig, manager);
		})
	);

	const showUi = () => {
		loadUi().then(({show}) => {
			show();
		});
	};

	manager.on('dirty', (isDirty) => {
		if (isDirty) {
			showUi();
		}
	});

	if (!manager.isDirty()) {
		return Promise.resolve({
			config,
			manager,
			show: showUi
		});
	}

	return loadUi().then((props) => ({
		...props,
		manager
	}));
};
