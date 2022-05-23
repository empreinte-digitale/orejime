import React from 'react';
import {Close} from './Icons';
import Dialog from '../../components/Dialog';
import {template} from '../../utils/template';
import {useTranslations} from '../../utils/hooks';
import {ModalComponent} from '../../components/types/Modal';
import PoweredByLink from '../../components/PoweredByLink';

const Modal: ModalComponent = ({
	isForced,
	privacyPolicyUrl,
	onClose,
	onSave,
	children
}) => {
	const t = useTranslations();

	return (
		<Dialog
			isAlert={isForced}
			aria={{'labelledby': 'orejime-modal-title'}}
			portalClassName="orejime-Env"
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

						<PoweredByLink className="orejime-Modal-poweredByLink" />
					</div>
				</form>
			</div>
		</Dialog>
	);
};

export default Modal;
