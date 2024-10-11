import {Translations} from '../ui';

export default {
	banner: {
		title: null,
		description:
			'Nous collectons et traitons vos informations personnelles dans le but suivant : {purposes}.\nPour en savoir plus, merci de lire notre {privacyPolicy}.\n',
		privacyPolicyLabel: 'politique de confidentialité',
		accept: 'Accepter',
		acceptTitle: 'Accepter les cookies',
		decline: 'Refuser',
		declineTitle: null,
		configure: 'En savoir plus',
		configureTitle: null
	},
	modal: {
		title: 'Les informations que nous collectons',
		description:
			'Ici, vous pouvez voir et personnaliser les informations que nous collectons sur vous.\nPour en savoir plus, merci de lire notre {privacyPolicy}.\n',
		privacyPolicyLabel: 'politique de confidentialité',
		close: 'Fermer',
		closeTitle: null,
		globalPreferences: 'Préférences pour tous les services',
		acceptAll: 'Tout accepter',
		declineAll: 'Tout refuser',
		save: 'Sauvegarder',
		saveTitle: 'Sauvegarder ma configuration sur les informations collectées'
	},
	purpose: {
		mandatory: 'toujours requis',
		mandatoryTitle: 'Cette application est toujours requise',
		exempt: 'opt-out',
		exemptTitle:
			'Cette application est chargée par défaut (mais vous pouvez la désactiver)',
		showMore: 'Voir plus de détails',
		accept: 'Accepter',
		decline: 'Refuser',
		enabled: 'activé',
		disabled: 'désactivé',
		partial: 'partiel'
	},
	misc: {
		newWindowTitle: 'nouvelle fenêtre',
		updateNeeded:
			'Des modifications ont eu lieu depuis votre dernière visite, merci de mettre à jour votre consentement.',
		poweredBy: 'Propulsé par Orejime'
	}
} satisfies Translations as Translations;
