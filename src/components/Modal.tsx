import React from 'react';
import {Close} from './Icons';
import Dialog from './Dialog';
import {template} from '../utils/template';
import {useTranslations} from '../utils/hooks';

interface ModalProps {
	isForced: boolean;
	privacyPolicyUrl: string;
	onClose: () => void;
	onSave: () => void;
	children: React.ReactNode;
}

const Modal = ({
	isForced,
	privacyPolicyUrl,
	onClose,
	onSave,
	children
}: ModalProps) => {
	const t = useTranslations();

	return (
		<Dialog
			isAlert={isForced}
			aria={{'labelledby': 'orejime-modal-title'}}
			portalClassName="orejime-ModalPortal"
			overlayClassName="orejime-ModalOverlay"
			className="orejime-ModalWrapper"
			onRequestClose={onClose}
		>
			<div className="orejime-Modal">
				<div className="orejime-Modal-header">
					{!isForced && (
						<button
							title={t.modal.closeTitle}
							className="orejime-Modal-closeButton"
							type="button"
							onClick={onClose}
						>
							<Close title={t.modal.close} />
						</button>
					)}

					<h1 className="orejime-Modal-title" id="orejime-modal-title">
						{t.modal.title}
					</h1>
					<p className="orejime-Modal-description">
						{isForced ? (
							<p className="orejime-Modal-description">
								<strong className="orejime-Modal-changes">
									{t.misc.updateNeeded}
								</strong>
							</p>
						) : null}
						{template(t.modal.description, {
							privacyPolicy: (
								<a
									key="privacyPolicyLink"
									className="orejime-Modal-privacyPolicyLink"
									onClick={(e) => {
										onClose();
									}}
									href={privacyPolicyUrl}
								>
									{t.modal.privacyPolicyLabel}
								</a>
							)
						})}
					</p>
				</div>

				<form
					className="orejime-Modal-form"
					onSubmit={(event) => {
						event.preventDefault();
						onSave();
					}}
				>
					<div className="orejime-Modal-body">{children}</div>
					<div className="orejime-Modal-footer">
						<button
							className="orejime-Button orejime-Button--save orejime-Modal-saveButton"
							title={t.modal.saveTitle}
						>
							{t.modal.save}
						</button>
						<a
							target="_blank"
							className="orejime-Modal-poweredByLink"
							href={'https://orejime.empreintedigitale.fr'}
							title={`${t.misc.poweredBy} (${t.misc.newWindowTitle})`}
						>
							{t.misc.poweredBy}
						</a>
					</div>
				</form>
			</div>
		</Dialog>
	);
};

export default Modal;
