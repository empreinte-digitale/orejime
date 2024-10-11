import {Translations} from '../ui';

export default {
	banner: {
		title: null,
		description: "Colectăm și procesăm informațiile dvs. personale în următoarele scopuri: {purposes}.\nPentru a afla mai multe, vă rugăm să citiți {privacyPolicy}.",
		privacyPolicyLabel: "politica privacy",
		accept: "Accepta",
		acceptTitle: "Acceptați toate modulele cookie",
		decline: "Renunță",
		declineTitle: "Refuzați toate modulele cookie opționale",
		configure: "Află mai multe",
		configureTitle: "Alegeți modulele cookie"
	},
	modal: {
		title: "Informațiile pe care le colectăm",
		description: "Aici puteți vedea și personaliza informațiile pe care le colectăm despre dvs.\nPentru a afla mai multe, vă rugăm să citiți {privacyPolicy}.",
		privacyPolicyLabel: "politica privacy",
		close: "Aproape",
		closeTitle: null,
		globalPreferences: "Preferințe pentru toate serviciile",
		acceptAll: "Accepta totul",
		declineAll: "Refuză toate",
		save: "Salvează",
		saveTitle: null
	},
	purpose: {
		mandatory: "întotdeauna necesar",
		mandatoryTitle: "Această aplicație este întotdeauna necesară",
		exempt: "opt-out",
		exemptTitle: "Această aplicație este încărcată în mod implicit (dar puteți renunța)",
		showMore: "Arata mai mult",
		accept: "Accepta",
		decline: "Renunță",
		enabled: "activat",
		disabled: "dezactivat",
		partial: "parţial"
	},
	misc: {
		newWindowTitle: "fereastră nouă",
		updateNeeded: "Au existat modificări de la ultima vizită, vă rugăm să actualizați consimțământul.",
		poweredBy: "Realizat de Orejime"
	}
} satisfies Translations as Translations;
