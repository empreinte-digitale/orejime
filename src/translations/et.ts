import {Translations} from '../ui';

export default {
	banner: {
		title: null,
		description: "Me kogume ja töötleme teie isikuandmeid järgmistel eesmärkidel: {purposes}.\nLisateabe saamiseks lugege palun meie {privacyPolicy}",
		privacyPolicyLabel: "privaatsustingimused",
		accept: "Nõustu",
		acceptTitle: "Nõustu küpsistega",
		decline: "Keeldu",
		declineTitle: null,
		configure: "Lisateave",
		configureTitle: null
	},
	modal: {
		title: "Isikuandmete kogumine",
		description: "Siit saate vaadata ja hallata teavet, mida me teie kohta kogume.\nLisateabe saamiseks lugege palun meie {privacyPolicy}",
		privacyPolicyLabel: "privaatsustingimused",
		close: "Sulge",
		closeTitle: null,
		globalPreferences: "Eelistused kõigile teenustele",
		acceptAll: "Nõustu kõigi rakendustega",
		declineAll: "Keela kõik rakendused",
		save: "Salvesta",
		saveTitle: "Salvesta kogutud teabe seadistused"
	},
	purpose: {
		mandatory: "alati vajalik",
		mandatoryTitle: "See rakendus on alati vajalik",
		exempt: "Opt-Out",
		exemptTitle: "See rakendus on vaikimisi lisatud (kuid saate sellest loobuda)",
		showMore: "Näita rohkem",
		accept: "Nõustu",
		decline: "Keeldu",
		enabled: "lubatud",
		disabled: "välja lülitatud",
		partial: "osaline"
	},
	misc: {
		newWindowTitle: "uus aken",
		updateNeeded: "Pärast teie viimast külastust on toimunud muudatusi, palun uuendage oma nõusolekut.",
		poweredBy: "Teenuse pakkuja on Orejime"
	}
} satisfies Translations;
