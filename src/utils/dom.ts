import type {ElementReference} from '../types';

export const getElement = (
	reference: ElementReference,
	defaultElement?: HTMLElement
) => {
	if (!reference) {
		return defaultElement;
	}

	if (typeof reference === 'string') {
		return document.querySelector(reference) as HTMLElement;
	}

	return reference;
};

export const getRootElement = (reference: ElementReference) => {
	const element = getElement(reference) || document.createElement('div');

	if (!element.classList.contains('orejime-Root')) {
		element.classList.add('orejime-Root');
	}

	if (!element.parentNode) {
		document.body.insertBefore(element, document.body.firstChild);
	}

	return element;
};
