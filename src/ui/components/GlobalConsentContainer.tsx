import React from 'react';
import {useManager} from '../utils/hooks';
import GlobalConsent from '../themes/orejime/GlobalConsent';

const GlobalConsentContainer = () => {
	const manager = useManager();

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
