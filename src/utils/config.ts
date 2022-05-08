import {
	Config,
	ImageDescriptor,
	Purpose,
	PurposeList,
	Translations
} from '../types';
import {language} from './i18n';

export const DefaultConfig: Config = {
	privacyPolicyUrl: '',
	forceModal: false,
	forceBanner: false,
	lang: language(),
	translations: {} as Translations,
	purposes: []
};

// Strips groups from a list of purposes and purpose groups.
export const purposesOnly = (purposes: PurposeList): Purpose[] =>
	purposes.flatMap((purpose) =>
		'purposes' in purpose
			? purposesOnly(purpose.purposes)
			: [purpose as Purpose]
	);

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
