import React from 'react';
import {useTranslations} from '../../utils/hooks';
import {ConsentState} from '../../components/types/ConsentState';
import {GlobalConsentComponent} from '../../components/types/GlobalConsent';
import Purpose from './Purpose';

const GlobalConsent: GlobalConsentComponent = ({
	isEnabled,
	isDisabled,
	acceptAll,
	declineAll
}) => {
	const t = useTranslations();

	return (
		<Purpose
			isGlobal
			id="orejime-global"
			title={t.modal.globalPreferences}
			consent={
				isEnabled
					? ConsentState.accepted
					: isDisabled
					? ConsentState.declined
					: ConsentState.partial
			}
			onChange={isEnabled ? declineAll : acceptAll}
		/>
	);
};

export default GlobalConsent;
