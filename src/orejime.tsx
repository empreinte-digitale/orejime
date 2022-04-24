import React, {createRef, ElementRef} from 'react';
import {render} from 'react-dom';
import ConsentManager from './ConsentManager';
import translations from './translations';
import Main from './components/Main';
import {language} from './utils/i18n';
import {deepMerge} from './utils/objects';
import {Config} from './types';
import {getRootElement} from './utils/dom';
import Context from './components/Context';

function getTranslations(config: Config) {
	return deepMerge(
		translations?.[config.lang as keyof typeof translations] ||
			translations.en,
		config.translations?.[config.lang]
	);
}

export const defaultConfig: Config = {
	privacyPolicyUrl: '',
	forceModal: false,
	forceBanner: false,
	lang: language(),
	translations: {},
	purposes: [],
	cookie: {
		name: 'eu-consent',
		duration: 120,
		stringify: JSON.stringify.bind(JSON),
		parse: JSON.parse.bind(JSON)
	}
};

export function init(conf: Config) {
	const config = deepMerge(defaultConfig, conf);
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
	const manager = new ConsentManager(config);
	const translations = getTranslations(config);
	const appRef = createRef<ElementRef<typeof Main>>();
	const app = render(
		<Context.Provider
			value={{
				config,
				manager,
				translations
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
	defaultConfig
};
