import {Manager, setup as setupManager} from './core';
import {Config, setup as setupUi} from './ui';
import {assertConfigValidity, DefaultConfig, purposesOnly} from './ui/utils/config';
import {deepMerge} from './ui/utils/objects';

export interface OrejimeInstance {
	config: Config;
	manager: Manager;
	prompt: () => void;
}

export default (partialConfig: Partial<Config>): OrejimeInstance => {
	const config = deepMerge(DefaultConfig, partialConfig);
	assertConfigValidity(config);

	const manager = setupManager(purposesOnly(config.purposes), {
		cookie: config.cookie
	});

	const {show, openModal} = setupUi(config, manager)

	manager.on('dirty', (isDirty) => {
		if (isDirty) {
			show();
		}
	});

	if (manager.isDirty()) {
		show();
	}

	return {
		config,
		manager,
		prompt: openModal
	};
}
