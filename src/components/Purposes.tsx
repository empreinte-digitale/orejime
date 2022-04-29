import React from 'react';
import {
	useConfig,
	useConsents,
	useManager,
	useTranslations
} from '../utils/hooks';
import PurposeTree from './PurposeTree';

const Purposes = () => {
	const config = useConfig();
	const manager = useManager();
	const t = useTranslations();
	const consents = useConsents();
	const purposes = manager.getPurposes();
	const toggleAll = (value: boolean) => {
		purposes.map((purpose) => {
			manager.updateConsent(purpose, value);
		});
	};

	const enableAll = () => toggleAll(true);
	const disableAll = () => toggleAll(false);

	const allDisabled =
		purposes.filter((purpose) => {
			return purpose.isMandatory || false ? false : consents[purpose.id];
		}).length === 0;

	const allEnabled =
		purposes.filter((purpose) => {
			return consents[purpose.id];
		}).length === purposes.length;

	const someOptional = purposes.some((purpose) => !purpose.isMandatory);

	return (
		<div>
			{someOptional ? (
				<div className="orejime-PurposeToggles">
					<button
						type="button"
						className="orejime-Button orejime-Button--info orejime-PurposeToggles-button orejime-PurposeToggles-enableAll"
						disabled={allEnabled}
						onClick={enableAll}
					>
						{t.modal.acceptAll}
					</button>
					<button
						type="button"
						className="orejime-Button orejime-Button--info orejime-PurposeToggles-button orejime-PurposeToggles-disableAll"
						disabled={allDisabled}
						onClick={disableAll}
					>
						{t.modal.declineAll}
					</button>
				</div>
			) : null}

			<PurposeTree
				purposes={config.purposes}
				consents={consents}
				onToggle={manager.updateConsent.bind(manager)}
			/>
		</div>
	);
};

export default Purposes;
