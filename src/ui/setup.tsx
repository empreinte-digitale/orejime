import React, {createRef} from 'react';
import {createRoot} from 'react-dom/client';
import {Manager} from '../core';
import Context from './components/Context';
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

	return {
		show,
		openModal
	};
};
