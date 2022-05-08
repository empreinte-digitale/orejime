import {Config} from './types';
import Orejime from './orejime';

declare global {
	interface Window {
		orejimeConfig: Config;
		orejime: any;
	}
}

function initDefaultInstance() {
	if (
		window.orejimeConfig !== undefined &&
		// `window.orejime instanceof Element` means there is a #orejime div in the dom
		(window.orejime === undefined || window.orejime instanceof Element)
	) {
		window.orejime = Orejime.init(window.orejimeConfig);
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initDefaultInstance);
} else {
	initDefaultInstance();
}

export default Orejime;
