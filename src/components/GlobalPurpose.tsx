import React from 'react';
import {useManager, useTranslations} from '../utils/hooks';

export const GlobalPurpose = () => {
	const manager = useManager();
	const t = useTranslations();

	return (
		<div className="orejime-PurposeToggles">
			<button
				type="button"
				className="orejime-Button orejime-Button--info orejime-PurposeToggles-button orejime-PurposeToggles-enableAll"
				disabled={manager.areAllPurposesEnabled()}
				onClick={() => manager.acceptAll()}
			>
				{t.modal.acceptAll}
			</button>

			<button
				type="button"
				className="orejime-Button orejime-Button--info orejime-PurposeToggles-button orejime-PurposeToggles-disableAll"
				disabled={manager.areAllPurposesDisabled()}
				onClick={() => manager.declineAll()}
			>
				{t.modal.declineAll}
			</button>
		</div>
	);
};
