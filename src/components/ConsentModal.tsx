import React, {Component} from 'react';
import {Close} from './Icons';
import Apps from './Apps';
import Dialog from './Dialog';
import ConsentManager from '../ConsentManager';
import {Config, Translate} from '../types';

interface Props {
	t: Translate;
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
			config.mustConsent && (!manager.confirmed || manager.changed);

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
								title={t(['close'])}
								className="orejime-Modal-closeButton"
								type="button"
								onClick={onHideRequest}
							>
								<Close t={t} />
							</button>
						)}

						<h1 className="orejime-Modal-title" id="orejime-modal-title">
							{t(['consentModal', 'title'])}
						</h1>
						<p className="orejime-Modal-description">
							{manager.changed &&
								(config.mustConsent || config.noNotice) && (
									<p className="orejime-Modal-description">
										<strong className="orejime-Modal-changes">
											{t(['consentNotice', 'changeDescription'])}
										</strong>
									</p>
								)}
							{t(['consentModal', 'description'])}&nbsp;
							{t(['consentModal', 'privacyPolicy', 'text'], {
								privacyPolicy: (
									<a
										key="privacyPolicyLink"
										className="orejime-Modal-privacyPolicyLink"
										onClick={(e) => {
											onHideRequest();
										}}
										href={config.privacyPolicy}
									>
										{t(['consentModal', 'privacyPolicy', 'name'])}
									</a>
								)
							})}
						</p>
					</div>

					<form className="orejime-Modal-form">
						<div className="orejime-Modal-body">
							<Apps t={t} config={config} manager={manager} />
						</div>
						<div className="orejime-Modal-footer">
							<button
								className="orejime-Button orejime-Button--save orejime-Modal-saveButton"
								onClick={onSaveRequest}
								title={t(['saveData'])}
							>
								{t(['save'])}
							</button>
							<a
								target="_blank"
								className="orejime-Modal-poweredByLink"
								href={
									config.poweredBy ||
									'https://orejime.empreintedigitale.fr'
								}
								title={`${t(['poweredBy'])} (${t(['newWindow'])})`}
							>
								{t(['poweredBy'])}
							</a>
						</div>
					</form>
				</div>
			</Dialog>
		);
	}
}
