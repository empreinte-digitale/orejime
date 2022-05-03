import React from 'react';
import {useConsent} from '../utils/hooks';
import Purpose from '../themes/orejime/Purpose';
import {ConsentState} from './types/ConsentState';
import {PurposeProps} from './types/Purpose';

export interface PurposeContainerProps
	extends Omit<PurposeProps, 'consent' | 'onChange'> {}

const PurposeContainer = (props: PurposeContainerProps) => {
	const [consent, setConsent] = useConsent(props.id);

	return (
		<Purpose
			{...props}
			consent={consent ? ConsentState.accepted : ConsentState.declined}
			onChange={setConsent}
		/>
	);
};

export default PurposeContainer;
