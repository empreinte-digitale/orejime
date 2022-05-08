import React, {Component} from 'react';
import ConsentManager from '../ConsentManager';
import {Config, Translations} from '../types';
import {getPurposes} from '../utils/config';
import {template} from '../utils/template';

export interface Props {
	t: Translations;
	config: Config;
	manager: ConsentManager;
	isModalVisible: boolean;
	isMandatory: boolean;
	onSaveRequest: () => void;
	onDeclineRequest: () => void;
	onConfigRequest: () => void;
}

export default class ConsentBanner extends Component<Props> {
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
			.map((purpose) => t?.purposes?.[purpose])
			.join(', ');
		const title = t.banner.title;

		return (
			<div
				aria-hidden={isModalVisible}
				className={`orejime-Banner${
					isMandatory ? ' orejime-Banner--mandatory' : ''
				}`}
			>
				<div className="orejime-Banner-body">
					{config.logo && (
						<div className="orejime-Banner-logoContainer">
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
								className="orejime-Banner-logo"
							/>
						</div>
					)}

					<div className="orejime-Banner-text">
						{title && (
							<h1
								className="orejime-Banner-title"
								id="orejime-Banner-title"
							>
								{title}
							</h1>
						)}

						<p className="orejime-Banner-description">
							{template(t.banner.description, {
								purposes: (
									<strong
										key="purposes"
										className="orejime-Banner-purposes"
									>
										{purposesText}
									</strong>
								),
								privacyPolicy: (
									<a
										key="privacyPolicyLink"
										className="orejime-Banner-privacyPolicyLink"
										href={config.privacyPolicy}
									>
										{t.banner.privacyPolicyLabel}
									</a>
								)
							})}
						</p>
					</div>

					{manager.changed && (
						<p className="orejime-Banner-changes">
							{t.misc.updateNeeded}
						</p>
					)}

					<ul className="orejime-Banner-actions">
						<li className="orejime-Banner-actionItem orejime-Banner-actionItem--save">
							<button
								className="orejime-Button orejime-Button--save orejime-Banner-button orejime-Banner-saveButton"
								type="button"
								title={t.banner.acceptTitle}
								onClick={onSaveRequest}
							>
								{t.banner.accept}
							</button>
						</li>
						<li className="orejime-Banner-actionItem orejime-Banner-actionItem--decline">
							<button
								className="orejime-Button orejime-Button--decline orejime-Banner-button orejime-Banner-declineButton"
								type="button"
								onClick={onDeclineRequest}
							>
								{t.banner.decline}
							</button>
						</li>
						<li className="orejime-Banner-actionItem orejime-Banner-actionItem--info">
							<button
								type="button"
								className="orejime-Button orejime-Button--info orejime-Banner-learnMoreButton"
								onClick={onConfigRequest}
							>
								{t.banner.configure}
							</button>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
