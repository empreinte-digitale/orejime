import React from 'react';
import {PurposeGroup as PurposeGroupType} from '../types';
import {useConsentGroup, useTheme} from '../utils/hooks';
import {ConsentState} from './types/ConsentState';

interface PurposeGroupProps extends PurposeGroupType {
	children: React.ReactNode;
}

const PurposeGroup = ({purposes, children, ...props}: PurposeGroupProps) => {
	const [
		areAllEnabled,
		areAllDisabled,
		acceptAll,
		declineAll
	] = useConsentGroup(purposes);
	const {Purpose} = useTheme();

	return (
		<Purpose
			{...props}
			consent={
				areAllEnabled
					? ConsentState.accepted
					: areAllDisabled
					? ConsentState.declined
					: ConsentState.partial
			}
			onChange={(consent) => (consent ? acceptAll() : declineAll())}
		>
			{children}
		</Purpose>
	);
};

export default PurposeGroup;
