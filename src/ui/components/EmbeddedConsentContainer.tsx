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
		if (ref.current && !consent) {
			if (ref.current.contains(document.activeElement)) {
				target.tabIndex = -1;
				target.focus();
			}
		}
	}, [consent])

	return consent
		? null
		: <EmbeddedConsent onConsent={() => setConsent(true)} />
};

export default EmbeddedConsentContainer;
