export interface V2Translations {
	consentModal: {
		title: string;
		description: string;
		privacyPolicy: {
			name: string;
			text: string;
		};
	};
	consentNotice: {
		title?: string;
		description: string;
		changeDescription: string;
		learnMore: string;
	};
	accept: string;
	acceptTitle: string;
	acceptAll: string;
	save: string;
	saveData: string;
	decline: string;
	declineAll: string;
	close: string;
	enabled: string;
	disabled: string;
	app: {
		optOut: {
			title: string;
			description: string;
		};
		required: {
			title: string;
			description: string;
		};
		purposes: string;
		purpose: string;
	};
	poweredBy: string;
	newWindow: string;
}
