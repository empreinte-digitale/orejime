import React, {useEffect, useRef} from 'react';
import {useConsent, useTheme} from '../utils/hooks';
import {Purpose} from '../../core';

interface EmbeddedConsentContainerProps {
	target: HTMLElement;
	purposeId: Purpose['id'];
}

const EmbeddedConsentContainer = ({target, purposeId}: EmbeddedConsentContainerProps) => {
	const [consent, setConsent] = useConsent(purposeId);
	const {EmbeddedConsent} = useTheme();
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		return () => {
			// Moves focus to the target element when removing
			// the placeholder.
			if (ref.current?.contains(document.activeElement)) {
				target.tabIndex = -1;
				target.focus();
			}
		}
	}, []);

	return consent
		? null
		: (
			<EmbeddedConsent
				purpose={purpose}
				onConsent={() => setConsent(true)}
			/>
		);
};

export default EmbeddedConsentContainer;
