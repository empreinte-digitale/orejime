import {Config, ImageDescriptor} from '../types';

export function getPurposes(config: Config) {
	const purposes = new Set<string>([]);
	for (var i = 0; i < config.purposes.length; i++) {
		const purposePurposes = config.purposes[i].purposes || [];
		for (var j = 0; j < purposePurposes.length; j++)
			purposes.add(purposePurposes[j]);
	}
	return Array.from(purposes);
}

export const imageAttributes = (image: ImageDescriptor) => {
	if (typeof image === 'string') {
		return {
			src: image,
			alt: ''
		};
	}

	return {
		src: '',
		alt: '',
		...image
	};
};
