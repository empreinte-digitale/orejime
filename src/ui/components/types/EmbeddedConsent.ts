import {type FC} from 'react';

export interface EmbeddedConsentProps {
	onConsent: () => void;
}

export type EmbeddedConsentComponent = FC<EmbeddedConsentProps>;
