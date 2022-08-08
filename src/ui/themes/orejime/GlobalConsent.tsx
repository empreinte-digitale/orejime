import React from 'react';
import {useTranslations} from '../../utils/hooks';
import {GlobalConsentComponent} from '../../components/types/GlobalConsent';

const GlobalConsent: GlobalConsentComponent = ({
	isEnabled,
	isDisabled,
	acceptAll,
	declineAll
}) => {
	const t = useTranslations();

	return (
		<div className="orejime-PurposeToggles">
			<button
				type="button"
				className="orejime-Button orejime-Button--info orejime-PurposeToggles-button orejime-PurposeToggles-enableAll"
				disabled={isEnabled}
				onClick={acceptAll}
			>
				{t.modal.acceptAll}
			</button>

			<button
				type="button"
				className="orejime-Button orejime-Button--info orejime-PurposeToggles-button orejime-PurposeToggles-disableAll"
				disabled={isDisabled}
				onClick={declineAll}
			>
				{t.modal.declineAll}
			</button>
		</div>
	);
};

export default GlobalConsent;
