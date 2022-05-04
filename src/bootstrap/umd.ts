import {Manager} from '../core';
import type {Config} from '../ui';

export interface UmdGlobal {
	config: Config;
	manager: Manager;
	show: () => Promise<void>;
}

declare global {
	interface Window {
		orejimeConfig: Config;
		orejime: UmdGlobal;
	}
}

export default (setupOrejime: (config: Config) => UmdGlobal) => {
	const setup = () => {
		if (
			window.orejimeConfig !== undefined &&
			// `window.orejime instanceof Element` means there is a #orejime div in the dom
			(window.orejime === undefined || window.orejime instanceof Element)
		) {
			window.orejime = setupOrejime(window.orejimeConfig);

			// As Orejime is loaded asynchronously, we're
			// emitting an event to let potential listeners
			// know when it is done loading.
			if (typeof CustomEvent !== 'undefined') {
				document.dispatchEvent(
					new CustomEvent('orejime.loaded', {
						detail: window.orejime
					})
				);
			}
		}
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setup);
	} else {
		setup();
	}
};
