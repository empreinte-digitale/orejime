import React, {createRef, ElementRef} from 'react';
import {render} from 'react-dom';
import Main from './components/Main';
import {deepMerge} from './utils/objects';
import {Config, Translations} from './types';
import {getRootElement} from './utils/dom';
import Context from './components/Context';
import {setup} from '../core';
import {
	DefaultConfig,
	purposesOnly,
	assertConfigValidity
} from './utils/config';

export function init(conf: Config) {
	const config = deepMerge(DefaultConfig, conf);
	assertConfigValidity(config);

	return import(
		/* webpackChunkName: "orejime-lang-[request]" */
		`./translations/${config.lang}.yml`
	).then((baseTranslations: Translations) => {
		const translations = deepMerge(baseTranslations, config.translations);
		const element = getRootElement(config.orejimeElement);
		const manager = setup(purposesOnly(config.purposes), {
			cookie: config.cookie
		});

		const appRef = createRef<ElementRef<typeof Main>>();

		render(
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
				manager: manager,
				config: config
			}
		};
	});
}

export default {
	init,
	defaultConfig: DefaultConfig
};
