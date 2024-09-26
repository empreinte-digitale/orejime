import React from 'react';
import {useManager, useTheme} from '../utils/hooks';

const GlobalConsentContainer = () => {
	const manager = useManager();
	const {GlobalConsent} = useTheme();

	return (
		<GlobalConsent
			isEnabled={manager.areAllPurposesEnabled()}
			isDisabled={manager.areAllPurposesDisabled()}
			acceptAll={() => manager.acceptAll()}
			declineAll={() => manager.declineAll()}
		/>
	);
};

export default GlobalConsentContainer;
