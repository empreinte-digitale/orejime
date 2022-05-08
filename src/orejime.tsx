import React, {createRef, ElementRef} from 'react';
import {render} from 'react-dom';
import Main from './components/Main';
import {deepMerge} from './utils/objects';
import {Config} from './types';
import {getRootElement} from './utils/dom';
import Context from './components/Context';
import {setup} from './core';
import {DefaultConfig, purposesOnly} from './utils/config';

export function init(conf: Config) {
	const config = deepMerge(DefaultConfig, conf);
	const errors = [];
	if (!Object.keys(config.purposes).length) {
		errors.push('  - you must define `purposes` to manage');
	}
	if (!config.privacyPolicyUrl.length) {
		errors.push('  - you must define `privacyPolicyUrl`');
	}
	if (errors.length) {
		errors.unshift('Orejime config error:');
		console.error(errors.join('\n'));
		return;
	}
	const element = getRootElement(config.orejimeElement);
	const manager = setup(purposesOnly(config.purposes), {
		cookie: config.cookie
	});

	const appRef = createRef<ElementRef<typeof Main>>();
	const app = render(
		<Context.Provider
			value={{
				config,
				manager,
				translations: config.translations
			}}
		>
			<Main ref={appRef} />
		</Context.Provider>,
		element
	);
	return {
		show: appRef.current!.openModal,
		internals: {
			react: app,
			manager: manager,
			config: config
		}
	};
}

export default {
	init,
	defaultConfig: DefaultConfig
};
