import React, {createRef, ElementRef} from 'react';
import {render} from 'react-dom';
import Context from './components/Context';
import Main from './components/Main';
import {Theme} from './components/types/Theme';
import type {SetupUi} from './types';
import {getRootElement} from './utils/dom';
import {once} from './utils/functions';

export default (theme: Theme): SetupUi => (config, manager) => {
	const element = getRootElement(config.orejimeElement);
	const appRef = createRef<ElementRef<typeof Main>>();
	const show = once(() => {
		render(
			<Context.Provider
				value={{
					config,
					manager,
					theme
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
