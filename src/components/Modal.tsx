import React from 'react';
import {Close} from './Icons';
import Purposes from './Purposes';
import Dialog from './Dialog';
import {template} from '../utils/template';
import {useConfig, useManager, useTranslations} from '../utils/hooks';

interface ModalProps {
	onHideRequest: () => void;
	onSaveRequest: () => void;
}

const Modal = ({onHideRequest, onSaveRequest}: ModalProps) => {
	const config = useConfig();
	const manager = useManager();
	const t = useTranslations();
	const isAlert = config.forceModal && manager.isDirty();

	return (
		<Dialog
			isAlert={isAlert}
			aria={{'labelledby': 'orejime-modal-title'}}
			portalClassName="orejime-ModalPortal"
			overlayClassName="orejime-ModalOverlay"
			className="orejime-ModalWrapper"
			onRequestClose={onHideRequest}
		>
			<div className="orejime-Modal">
				<div className="orejime-Modal-header">
					{!isAlert && (
						<button
							title={t.modal.closeTitle}
							className="orejime-Modal-closeButton"
							type="button"
							onClick={onHideRequest}
						>
							<Close title={t.modal.close} />
						</button>
					)}

					<h1 className="orejime-Modal-title" id="orejime-modal-title">
						{t.modal.title}
					</h1>
					<p className="orejime-Modal-description">
						{manager.changed && config.forceModal && (
							<p className="orejime-Modal-description">
								<strong className="orejime-Modal-changes">
									{t.misc.updateNeeded}
								</strong>
							</p>
						)}
						{template(t.modal.description, {
							privacyPolicy: (
								<a
									key="privacyPolicyLink"
									className="orejime-Modal-privacyPolicyLink"
									onClick={(e) => {
										onHideRequest();
									}}
									href={config.privacyPolicy}
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
						onSaveRequest();
					}}
				>
					<div className="orejime-Modal-body">
						<Purposes />
					</div>
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
