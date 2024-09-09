import {Translations} from '../ui';

export default {
	banner: {
		title: null,
		description: "Recopilem i processem la vostra informació personal amb la finalitat següent : {purposes}.\nPer saber-ne més, llegiu la nostre {privacyPolicy}.",
		privacyPolicyLabel: "política de privacitat",
		accept: "Acceptar",
		acceptTitle: "Acceptar les cookies",
		decline: "Refusar",
		declineTitle: null,
		configure: "Més informació",
		configureTitle: null
	},
	modal: {
		title: "La informació que recollim",
		description: "Aquí podeu veure i personalitzar la informació que recopilem sobre vosaltres.\nPer saber-ne més, llegiu la nostre {privacyPolicy}.",
		privacyPolicyLabel: "política de privacitat",
		close: "Tancar",
		closeTitle: null,
		globalPreferences: "Preferències per a tots els serveis",
		acceptAll: "Acceptar-ho tot",
		declineAll: "Rebutja tot",
		save: "Desa",
		saveTitle: "Desa la meva configuració sobre la informació recollida"
	},
	purpose: {
		mandatory: "sempre obligatori",
		mandatoryTitle: "Aquesta aplicació sempre és necessària",
		exempt: "desactivar",
		exemptTitle: "Aquesta aplicació es carrega de manera predeterminada (però podeu desactivar-la)",
		showMore: "Saber-ne més",
		accept: "Acceptar",
		decline: "Refusar",
		enabled: "actiu",
		disabled: "inactiu",
		partial: "parcial"
	},
	misc: {
		newWindowTitle: "finestra nova",
		updateNeeded: "S'han produït canvis des de la vostra última visita, actualitzeu el vostre consentiment.",
		poweredBy: "Desenvolupat per Orejime"
	}
} satisfies Translations;
