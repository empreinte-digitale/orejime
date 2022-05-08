import React from 'react';
import {useConsent} from '../utils/hooks';
import Purpose, {PurposeProps} from './Purpose';

export interface PurposeContainerProps
	extends Omit<PurposeProps, 'consent' | 'onChange'> {}

const PurposeContainer = (props: PurposeContainerProps) => {
	const [consent, setConsent] = useConsent(props.id);

	return <Purpose {...props} consent={consent} onChange={setConsent} />;
};

export default PurposeContainer;
