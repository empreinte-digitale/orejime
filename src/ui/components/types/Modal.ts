import {FC} from 'react';

export interface ModalProps {
	isForced: boolean;
	privacyPolicyUrl: string;
	onClose: () => void;
	onSave: () => void;
	children: React.ReactNode;
}

export type ModalComponent = FC<ModalProps>;
