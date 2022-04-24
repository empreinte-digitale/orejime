import React, {Component} from 'react';
import {Close} from './Icons';
import Purposes from './Purposes';
import Dialog from './Dialog';
import ConsentManager from '../ConsentManager';
import {Config, Translations} from '../types';
import {template} from '../utils/template';

interface Props {
	t: Translations;
	config: Config;
	manager: ConsentManager;
	isOpen: boolean;
	onHideRequest: () => void;
	onSaveRequest: () => void;
}

export default class ConsentModal extends Component<Props> {
	render() {
		const {
			isOpen,
			onHideRequest,
			onSaveRequest,
			config,
			manager,
			t
		} = this.props;

		const isAlert =
			config.forceModal && (!manager.confirmed || manager.changed);

		return (
			<Dialog
				isOpen={isOpen}
				aria={{'labelledby': 'orejime-modal-title'}}
				portalClassName="orejime-ModalPortal"
				overlayClassName="orejime-ModalOverlay"
				className="orejime-ModalWrapper"
				config={config}
				onRequestClose={onHideRequest}
				role={isAlert ? 'alertdialog' : 'dialog'}
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

					<form className="orejime-Modal-form">
						<div className="orejime-Modal-body">
							<Purposes t={t} config={config} manager={manager} />
						</div>
						<div className="orejime-Modal-footer">
							<button
								className="orejime-Button orejime-Button--save orejime-Modal-saveButton"
								onClick={onSaveRequest}
								title={t.modal.saveTitle}
							>
								{t.modal.save}
							</button>
							<a
								target="_blank"
								className="orejime-Modal-poweredByLink"
								href={
									config.poweredBy ||
									'https://orejime.empreintedigitale.fr'
								}
								title={`${t.misc.poweredBy} (${t.misc.newWindowTitle})`}
							>
								{t.misc.poweredBy}
							</a>
						</div>
					</form>
				</div>
			</Dialog>
		);
	}
}
