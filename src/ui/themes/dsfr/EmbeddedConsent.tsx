import React from 'react';
import {EmbeddedConsentComponent} from '../../components/types/EmbeddedConsent';
import {useTranslations} from '../../utils/hooks';
import {template} from '../../utils/template';

const EmbeddedConsent: EmbeddedConsentComponent = ({purpose, onConsent}) => {
	const t = useTranslations();

	return (
		<div class="fr-consent-placeholder">
			<p class="fr-h6">
				<strong>
					{template(t.embed.title, {
						purpose: purpose.title,
					})}
				</strong>
			</p>

			<p>{t.embed.description}</p>

			<button class="fr-btn" onClick={onConsent}>
				{t.embed.accept}
			</button>
		</div>
	);
};

export default EmbeddedConsent;
