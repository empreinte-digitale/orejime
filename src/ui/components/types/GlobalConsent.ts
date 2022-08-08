import {FC} from 'react';

export interface GlobalConsentProps {
	isEnabled: boolean;
	isDisabled: boolean;
	acceptAll: () => void;
	declineAll: () => void;
}

export type GlobalConsentComponent = FC<GlobalConsentProps>;
