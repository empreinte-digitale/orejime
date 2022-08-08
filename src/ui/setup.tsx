import React, {createRef, ElementRef} from 'react';
import {render} from 'react-dom';
import Main from './components/Main';
import {Config} from './types';
import {getRootElement} from './utils/dom';
import Context from './components/Context';
import {Manager} from '../core';
import {Theme} from './components/types/Theme';

export default (theme: Theme) => (config: Config, manager: Manager) => {
	const element = getRootElement(config.orejimeElement);
	const appRef = createRef<ElementRef<typeof Main>>();

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

	return appRef.current!.openModal;
};
