import React from 'react';
import {EmbeddedConsentComponent} from '../../components/types/EmbeddedConsent';
import {useTranslations} from '../../utils/hooks';

const EmbeddedConsent: EmbeddedConsentComponent = ({onConsent}) => {
	const t = useTranslations();

	return (
		<div class="fr-consent-placeholder">
			<h4 class="fr-h6">**Nom du service** est désactivé</h4>
			<p>Autorisez le dépôt de cookies pour accèder à cette fonctionnalité.</p>
			<button class="fr-btn" onClick={onConsent}>
				Autoriser
			</button>
		</div>
	);
};

export default EmbeddedConsent;
