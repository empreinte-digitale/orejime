import {FC} from 'react';
import {ImageDescriptor} from '../../types';

export interface BannerProps {
	isHidden: boolean;
	isForced?: boolean;
	needsUpdate: boolean;
	purposeTitles: string[];
	privacyPolicyUrl: string;
	logo?: ImageDescriptor;
	onAccept: () => void;
	onDecline: () => void;
	onConfigure: () => void;
}

export type BannerComponent = FC<BannerProps>;
