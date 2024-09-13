import React from 'react';
import {EmbeddedConsentComponent} from '../../components/types/EmbeddedConsent';
import {useTranslations} from '../../utils/hooks';

const EmbeddedConsent: EmbeddedConsentComponent = ({onConsent}) => {
	const t = useTranslations();

	return (
		<div class="orejime-EmbeddedConsent">
			<p>Blocked</p>
			<button onClick={onConsent}>Allow</button>
		</div>
	);
};

export default EmbeddedConsent;
