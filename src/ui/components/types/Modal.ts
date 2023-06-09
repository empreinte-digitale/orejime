import {FC} from 'react';

export interface ModalProps {
	isForced: boolean;
	needsUpdate: boolean;
	privacyPolicyUrl: string;
	onClose: () => void;
	onSave: () => void;
	children: React.ReactNode;
}

export type ModalComponent = FC<ModalProps>;
