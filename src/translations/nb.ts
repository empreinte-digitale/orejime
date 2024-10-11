import {Translations} from '../ui';

export default {
	banner: {
		title: null,
		description: "Vi samler inn og prosesserer din personlige informasjon av følgende årsaker: {purposes}.\nFor å lære mer, vennligst les vår {privacyPolicy}.",
		privacyPolicyLabel: "personvernerklæring",
		accept: "Akseptere",
		acceptTitle: "Godta alle informasjonskapsler",
		decline: "Avslå",
		declineTitle: "Avslå alle valgfrie informasjonskapsler",
		configure: "Lær mer",
		configureTitle: "Velg informasjonskapsler"
	},
	modal: {
		title: "Informasjon vi samler inn",
		description: "Her kan du se og velge hvilken informasjon vi samler inn om deg.\nFor å lære mer, vennligst les vår {privacyPolicy}.",
		privacyPolicyLabel: "personvernerklæring",
		close: "Lukk",
		closeTitle: null,
		globalPreferences: "Preferanser for alle tjenester",
		acceptAll: "Godta alt",
		declineAll: "Avslå alt",
		save: "Opslaan",
		saveTitle: null
	},
	purpose: {
		mandatory: "alltid påkrevd",
		mandatoryTitle: "Denne applikasjonen er alltid påkrevd",
		exempt: "opt-out",
		exemptTitle: "Denne appen er lastet som standard (men du kan skru det av)",
		showMore: "Vise mer",
		accept: "Akseptere",
		decline: "Avslå",
		enabled: "aktivert",
		disabled: "deaktivert",
		partial: "delvis"
	},
	misc: {
		newWindowTitle: "nytt vindu",
		updateNeeded: "Det har skjedd endringer siden ditt siste besøk, vennligst oppdater ditt samtykke.",
		poweredBy: "Laget med Orejime"
	}
} satisfies Translations as Translations;
