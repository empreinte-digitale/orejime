import {Translations} from '../ui';

export default {
	banner: {
		title: null,
		description: "Vi samlar och bearbetar din personliga data i följande syften: {purposes}.\nFör att veta mer, läs vår {privacyPolicy}.",
		privacyPolicyLabel: "Integritetspolicy",
		accept: "Acceptera",
		acceptTitle: null,
		decline: "Avböj",
		declineTitle: null,
		configure: "Läs mer",
		configureTitle: null
	},
	modal: {
		title: "Information som vi samlar",
		description: "Här kan du se och anpassa vilken information vi samlar om dig.\nFör att veta mer, läs vår {privacyPolicy}.",
		privacyPolicyLabel: "Integritetspolicy",
		close: "Stäng",
		closeTitle: null,
		globalPreferences: "Preferenser för alla tjänster",
		acceptAll: "Acceptera alla",
		declineAll: "Tacka nej till alla",
		save: "Spara",
		saveTitle: null
	},
	purpose: {
		mandatory: "Krävs alltid",
		mandatoryTitle: "Den här applikationen krävs alltid",
		exempt: "Avaktivera",
		exemptTitle: "Den här appen laddas som standardinställning (men du kan avaktivera den)",
		showMore: "Visa mer",
		accept: "Acceptera",
		decline: "Avböj",
		enabled: "aktiverad",
		disabled: "deaktiverad",
		partial: "partiell"
	},
	misc: {
		newWindowTitle: "nytt fönster",
		updateNeeded: "Det har skett förändringar sedan ditt senaste besök, var god uppdatera ditt medgivande.",
		poweredBy: "Körs på Orejime"
	}
} satisfies Translations as Translations;
