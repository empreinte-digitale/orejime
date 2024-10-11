import {Translations} from '../ui';

export default {
	banner: {
		title: null,
		description:
			'We collect and process your personal information for the following purposes: {purposes}.\nTo learn more, please read our {privacyPolicy}.\n',
		privacyPolicyLabel: 'privacy policy',
		accept: 'Accept',
		acceptTitle: 'Accept all cookies',
		decline: 'Decline',
		declineTitle: 'Decline optional cookies',
		configure: 'Learn more',
		configureTitle: 'Choose cookies'
	},
	modal: {
		title: 'Information that we collect',
		description:
			'Here you can see and customize the information that we collect about you.\nTo learn more, please read our {privacyPolicy}.\n',
		privacyPolicyLabel: 'privacy policy',
		close: 'Close',
		closeTitle: null,
		globalPreferences: 'Global preferences',
		acceptAll: 'Accept all apps',
		declineAll: 'Decline all apps',
		save: 'Save',
		saveTitle: 'Save my configuration on collected information'
	},
	purpose: {
		mandatory: 'always required',
		mandatoryTitle: 'This application is always required',
		exempt: 'opt-out',
		exemptTitle: 'This app is loaded by default (but you can opt out)',
		showMore: 'Show more details',
		accept: 'Accept',
		decline: 'Decline',
		enabled: 'enabled',
		disabled: 'disabled',
		partial: 'partial'
	},
	misc: {
		newWindowTitle: 'new window',
		updateNeeded:
			'There were changes since your last visit, please update your consent.',
		poweredBy: 'Powered by Orejime'
	}
} satisfies Translations as Translations;
