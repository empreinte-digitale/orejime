import {Translations} from '../ui';

export default {
	banner: {
		title: null,
		description: "Keräämme ja käsittelemme henkilötietoja seuraaviin tarkoituksiin: {purposes}.\nVoit lukea lisätietoja {privacyPolicy}.",
		privacyPolicyLabel: "tietosuojasivultamme",
		accept: "Hyväksy",
		acceptTitle: null,
		decline: "Hylkää",
		declineTitle: null,
		configure: "Lue lisää",
		configureTitle: null
	},
	modal: {
		title: "Keräämämme tiedot",
		description: "Voit tarkastella ja muokata sinusta keräämiämme tietoja.\nVoit lukea lisätietoja {privacyPolicy}.",
		privacyPolicyLabel: "tietosuojasivultamme",
		close: "Sulje",
		closeTitle: null,
		globalPreferences: "Kaikkien palvelujen asetukset",
		acceptAll: "Hyväksyä kaikki",
		declineAll: "Hylkää kaikki",
		save: "Tallenna",
		saveTitle: null
	},
	purpose: {
		mandatory: "vaaditaan",
		mandatoryTitle: "Sivusto vaatii tämän aina",
		exempt: "ladataan oletuksena",
		exemptTitle: "Ladataan oletuksena (mutta voit ottaa sen pois päältä)",
		showMore: "Lue lisää",
		accept: "Hyväksy",
		decline: "Hylkää",
		enabled: "käytössä",
		disabled: "pois käytöstä",
		partial: "osittainen"
	},
	misc: {
		newWindowTitle: "uusi ikkuna",
		updateNeeded: "Olemme tehneet muutoksia ehtoihin viime vierailusi jälkeen, tarkista ehdot.",
		poweredBy: "Palvelun tarjoaa Orejime"
	}
} satisfies Translations;
