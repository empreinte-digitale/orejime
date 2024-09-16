import {type FC} from 'react';
import {Purpose} from '../../types';

export interface EmbeddedConsentProps {
	purpose: Purpose;
	onConsent: () => void;
}

export type EmbeddedConsentComponent = FC<EmbeddedConsentProps>;
