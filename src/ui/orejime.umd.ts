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
		Orejime.init(window.orejimeConfig).then((orejime) => {
			window.orejime = orejime;
		});
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initDefaultInstance);
} else {
	initDefaultInstance();
}

export default Orejime;
