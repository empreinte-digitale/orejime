import React, {createRef, ElementRef} from 'react';
import {render} from 'react-dom';
import Main from './components/Main';
import {deepMerge} from './utils/objects';
import {Config} from './types';
import {getRootElement} from './utils/dom';
import Context from './components/Context';
import {Manager} from '../core';
import {DefaultConfig, assertConfigValidity} from './utils/config';

export default (conf: Config, manager: Manager) => {
	const config = deepMerge(DefaultConfig, conf);
	assertConfigValidity(config);

	const element = getRootElement(config.orejimeElement);
	const appRef = createRef<ElementRef<typeof Main>>();

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

	return {
		show: appRef.current!.openModal,
		manager: manager,
		config: config
	};
};
