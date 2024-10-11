import {FC} from 'react';
import {Purpose} from '../../types';
import {ConsentState} from './ConsentState';

export interface PurposeProps extends Omit<Purpose, 'cookies'> {
	consent: ConsentState;
	children?: React.ReactNode;
	onChange: (checked: boolean) => void;
}

export type PurposeComponent = FC<PurposeProps>;
