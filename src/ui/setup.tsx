import React, {createRef} from 'react';
import {render} from 'react-dom';
import Context from './components/Context';
import Main, {MainHandle} from './components/Main';
import type {Config} from './types';
import {getRootElement} from './utils/dom';
import {once} from './utils/functions';
import {Manager} from '../core';

export default (config: Config, manager: Manager) => {
	const element = getRootElement(config.orejimeElement);
	const appRef = createRef<MainHandle>();
	const show = once(() => {
		render(
			<Context.Provider
				value={{
					config,
					manager
				}}
			>
				<Main ref={appRef} />
			</Context.Provider>,
			element
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
