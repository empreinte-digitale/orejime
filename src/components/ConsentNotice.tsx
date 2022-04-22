import React, {Component} from 'react';
import ConsentManager from '../ConsentManager';
import {Config, Translate} from '../types';
import {getPurposes} from '../utils/config';

export interface Props {
	t: Translate;
	config: Config;
	manager: ConsentManager;
	isModalVisible: boolean;
	isMandatory: boolean;
	onSaveRequest: () => void;
	onDeclineRequest: () => void;
	onConfigRequest: () => void;
}

export default class ConsentNotice extends Component<Props> {
	render() {
		const {
			config,
			manager,
			isModalVisible,
			isMandatory,
			t,
			onSaveRequest,
			onDeclineRequest,
			onConfigRequest
		} = this.props;

		const purposes = getPurposes(config);
		const purposesText = purposes
			.map((purpose) => t(['purposes', purpose]))
			.join(', ');
		const title = t(['consentNotice', 'title']);

		return (
			<div
				aria-hidden={isModalVisible}
				className={`orejime-Notice${
					isMandatory ? ' orejime-Notice--mandatory' : ''
				}`}
			>
				<div className="orejime-Notice-body">
					{config.logo && (
						<div className="orejime-Notice-logoContainer">
							<img
								src={
									typeof config.logo == 'object'
										? config.logo.src
										: (config.logo as string)
								}
								alt={
									typeof config.logo == 'object' && config.logo.alt
										? config.logo.alt
										: ''
								}
								className="orejime-Notice-logo"
							/>
						</div>
					)}

					<div className="orejime-Notice-text">
						{title && (
							<h1
								className="orejime-Notice-title"
								id="orejime-notice-title"
							>
								{title}
							</h1>
						)}

						<p className="orejime-Notice-description">
							{t(['consentNotice', 'description'], {
								purposes: (
									<strong
										key="purposes"
										className="orejime-Notice-purposes"
									>
										{purposesText}
									</strong>
								)
							})}
							{t(['consentNotice', 'privacyPolicy', 'text'], {
								privacyPolicy: (
									<a
										key="privacyPolicyLink"
										className="orejime-Notice-privacyPolicyLink"
										href={config.privacyPolicy}
									>
										{t(['consentNotice', 'privacyPolicy', 'name'])}
									</a>
								)
							})}
						</p>
					</div>

					{manager.changed && (
						<p className="orejime-Notice-changes">
							{t(['consentNotice', 'changeDescription'])}
						</p>
					)}

					<ul className="orejime-Notice-actions">
						<li className="orejime-Notice-actionItem orejime-Notice-actionItem--save">
							<button
								className="orejime-Button orejime-Button--save orejime-Notice-button orejime-Notice-saveButton"
								type="button"
								title={t(['acceptTitle']) as string}
								onClick={onSaveRequest}
							>
								{t(['accept'])}
							</button>
						</li>
						<li className="orejime-Notice-actionItem orejime-Notice-actionItem--decline">
							<button
								className="orejime-Button orejime-Button--decline orejime-Notice-button orejime-Notice-declineButton"
								type="button"
								onClick={onDeclineRequest}
							>
								{t(['decline'])}
							</button>
						</li>
						<li className="orejime-Notice-actionItem orejime-Notice-actionItem--info">
							<button
								type="button"
								className="orejime-Button orejime-Button--info orejime-Notice-learnMoreButton"
								onClick={onConfigRequest}
							>
								{t(['consentNotice', 'learnMore'])}
							</button>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
