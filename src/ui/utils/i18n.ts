declare global {
	interface Window {
		language: string;
	}
}

export function language() {
	return window.language || document.documentElement.lang || 'en';
}
