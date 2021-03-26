import {CssNamespace} from '../types';

export function createCssNamespace(namespace: string): CssNamespace {
	return function ns(classNames) {
		const splitClassNames = classNames.split(' ');
		return splitClassNames
			.filter((className) => className.length > 0)
			.map((className) => `${namespace}-${className}`)
			.join(' ');
	};
}
