import React from 'react';
import {useTranslations} from '../utils/hooks';

interface GlobalPurposeProps {
	areAllEnabled: boolean;
	areAllDisabled: boolean;
	acceptAll: () => void;
	declineAll: () => void;
}

export const GlobalPurpose = ({
	areAllEnabled,
	areAllDisabled,
	acceptAll,
	declineAll
}: GlobalPurposeProps) => {
	const t = useTranslations();

	return (
		<div className="orejime-PurposeToggles">
			<button
				type="button"
				className="orejime-Button orejime-Button--info orejime-PurposeToggles-button orejime-PurposeToggles-enableAll"
				disabled={areAllEnabled}
				onClick={acceptAll}
			>
				{t.modal.acceptAll}
			</button>

			<button
				type="button"
				className="orejime-Button orejime-Button--info orejime-PurposeToggles-button orejime-PurposeToggles-disableAll"
				disabled={areAllDisabled}
				onClick={declineAll}
			>
				{t.modal.declineAll}
			</button>
		</div>
	);
};
