import {Manager} from '../core';
import type {Config} from '../ui';

declare global {
	interface Window {
		orejimeConfig: Config;
		orejime: any;
	}
}

export interface UmdGlobal {
	config: Config;
	manager: Manager;
	show: () => void;
}

export default (setupOrejime: (config: Config) => Promise<UmdGlobal>) => {
	const setup = () => {
		if (
			window.orejimeConfig !== undefined &&
			// `window.orejime instanceof Element` means there is a #orejime div in the dom
			(window.orejime === undefined || window.orejime instanceof Element)
		) {
			setupOrejime(window.orejimeConfig).then((orejime) => {
				window.orejime = orejime;

				// As Orejime is loaded asynchronously, we're
				// emitting an event to let potential listeners
				// when it is done loading.
				if (typeof CustomEvent !== 'undefined') {
					document.dispatchEvent(
						new CustomEvent('orejime.loaded', {
							detail: orejime
						})
					);
				}
			});
		}
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setup);
	} else {
		setup();
	}
};
