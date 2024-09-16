import React from 'react';
import {EmbeddedConsentComponent} from '../../components/types/EmbeddedConsent';
import {useTranslations} from '../../utils/hooks';
import {template} from '../../utils/template';

const EmbeddedConsent: EmbeddedConsentComponent = ({purpose, onConsent}) => {
	const t = useTranslations();

	return (
		<div class="orejime-EmbeddedConsent">
			<p>
				<strong>
					{template(t.embed.title, {
						purpose: purpose.title,
					})}
				</strong>
				<br />
				{t.embed.description}
			</p>

			<button onClick={onConsent}>{t.embed.accept}</button>
		</div>
	);
};

export default EmbeddedConsent;
