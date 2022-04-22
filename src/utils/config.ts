import {Config} from '../types';

export function getPurposes(config: Config) {
	const purposes = new Set<string>([]);
	for (var i = 0; i < config.purposes.length; i++) {
		const purposePurposes = config.purposes[i].purposes || [];
		for (var j = 0; j < purposePurposes.length; j++)
			purposes.add(purposePurposes[j]);
	}
	return Array.from(purposes);
}
