import React, {createRef} from 'react';
import {createRoot} from 'react-dom/client';
import {Manager} from '../core';
import Context from './components/Context';
import EmbeddedConsentContainer from './components/EmbeddedConsentContainer';
import Main, {MainHandle} from './components/Main';
import type {Config} from './types';
import {getRootElement} from './utils/dom';
import {once} from './utils/functions';

export default (config: Config, manager: Manager) => {
	const element = getRootElement(config.orejimeElement);
	const appRef = createRef<MainHandle>();
	const show = once(() => {
		createRoot(element).render(
			<Context.Provider
				value={{
					config,
					manager
				}}
			>
				<Main ref={appRef} />
			</Context.Provider>
		);
	});

	const openModal = () => {
		show();
		appRef.current!.openModal();
	};

	const embeds = document.querySelectorAll<HTMLElement>('body [data-purpose]:not(script)');

	embeds.forEach((embed) => {
		const w = document.createElement('div');
		embed.insertAdjacentElement('beforebegin', w);

		createRoot(w).render(
			<Context.Provider
				value={{
					config,
					manager
				}}
			>
				<EmbeddedConsentContainer
					target={embed}
					purposeId={embed.dataset.purpose}
				/>
			</Context.Provider>
		)
	});

	return {
		show,
		openModal
	};
};
