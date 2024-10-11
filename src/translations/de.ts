import {Translations} from '../ui';

export default {
	banner: {
		title: null,
		description: "Wir speichern und verarbeiten Ihre persönlichen Daten für folgende Zwecke: {purposes}.\nBitte lesen Sie unsere {privacyPolicy} um weitere Details zu erfahren.",
		privacyPolicyLabel: "Datenschutzerklärung",
		accept: "Akzeptieren",
		acceptTitle: "Cookies akzeptieren",
		decline: "Ablehnen",
		declineTitle: "optionalen Cookies ablehnen",
		configure: "Mehr erfahren",
		configureTitle: "Cookies auswählen"
	},
	modal: {
		title: "Informationen zur Privatsphäre",
		description: "Hier können Sie einsehen und anpassen, welche persönlichen Daten gespeichert werden.\nBitte lesen Sie unsere {privacyPolicy} um weitere Details zu erfahren.",
		privacyPolicyLabel: "Datenschutzerklärung",
		close: "Schließen",
		closeTitle: null,
		globalPreferences: "globale Vorlieben",
		acceptAll: "Alle Einstellungen akzeptieren",
		declineAll: "Alle Einstellungen ablehnen",
		save: "Speichern",
		saveTitle: "Meine Einstellungen speichern"
	},
	purpose: {
		mandatory: "immer notwendig",
		mandatoryTitle: "Diese Einstellungen werden immer benötigt",
		exempt: "Opt-Out",
		exemptTitle: "Diese Einstellungen als Standard festlegen (sie können jederzeit deaktiviert werden)",
		showMore: "Mehr Details zeigen",
		accept: "Akzeptieren",
		decline: "Ablehnen",
		enabled: "aktiviert",
		disabled: "deaktiviert",
		partial: "teilweise"
	},
	misc: {
		newWindowTitle: "Neues Fenster",
		updateNeeded: "Es gab Änderungen seit Ihrem letzten Besuch, bitte aktualisieren Sie Ihre Auswahl.",
		poweredBy: "Durchgeführt mit Orejime"
	}
} satisfies Translations as Translations;
