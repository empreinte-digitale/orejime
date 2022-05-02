import type {Translations} from '../../ui/types';
import type {V2Translations} from '../v2/types';

const join = (strings: string[], separator = ' ') =>
	strings.filter((string) => !!string).join(separator);

export const migrateTranslations = (
	translations: Partial<V2Translations>
): Translations => {
	return {
		banner: {
			title: translations?.consentNotice?.title,
			description: join([
				translations?.consentNotice?.description,
				translations?.consentModal?.privacyPolicy?.text
			]),
			privacyPolicyLabel: translations?.consentModal?.privacyPolicy?.name,
			accept: translations?.accept,
			acceptTitle: translations?.acceptTitle,
			decline: translations?.decline,
			declineTitle: translations?.decline,
			configure: translations?.consentNotice?.learnMore,
			configureTitle: translations?.consentNotice?.learnMore
		},
		modal: {
			title: translations?.consentModal?.title,
			description: join([
				translations?.consentModal?.description,
				translations?.consentModal?.privacyPolicy?.text
			]),
			privacyPolicyLabel: translations?.consentModal?.privacyPolicy?.name,
			close: translations?.close,
			closeTitle: translations?.close,
			globalPreferences: '',
			acceptAll: translations?.acceptAll,
			declineAll: translations?.declineAll,
			save: translations?.save,
			saveTitle: translations?.saveData
		},
		purpose: {
			mandatory: translations?.app?.required?.title,
			mandatoryTitle: translations?.app?.required?.description,
			exempt: translations?.app?.optOut?.title,
			exemptTitle: translations?.app?.optOut?.description,
			showMore: '',
			accept: translations?.accept,
			decline: translations?.decline,
			enabled: translations?.enabled,
			disabled: translations?.disabled,
			partial: ''
		},
		misc: {
			newWindowTitle: translations?.newWindow,
			updateNeeded: translations?.consentNotice?.changeDescription,
			poweredBy: translations?.poweredBy
		}
	};
};
