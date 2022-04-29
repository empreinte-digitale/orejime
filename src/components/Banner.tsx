import React from 'react';
import {imageAttributes} from '../utils/config';
import {useConfig, useManager, useTranslations} from '../utils/hooks';
import {template} from '../utils/template';

export interface BannerProps {
	isModalVisible: boolean;
	isForced?: boolean;
	purposeTitles: string[];
	onSaveRequest: () => void;
	onDeclineRequest: () => void;
	onConfigRequest: () => void;
}

const Banner = ({
	isModalVisible,
	isForced,
	purposeTitles,
	onSaveRequest,
	onDeclineRequest,
	onConfigRequest
}: BannerProps) => {
	const config = useConfig();
	const manager = useManager();
	const t = useTranslations();

	return (
		<div
			aria-hidden={isModalVisible}
			className={`orejime-Banner${
				isForced ? ' orejime-Banner--forced' : ''
			}`}
		>
			<div className="orejime-Banner-body">
				{config.logo && (
					<div className="orejime-Banner-logoContainer">
						<img
							className="orejime-Banner-logo"
							{...imageAttributes(config.logo)}
						/>
					</div>
				)}

				<div className="orejime-Banner-text">
					{t.banner.title && (
						<h1
							className="orejime-Banner-title"
							id="orejime-Banner-title"
						>
							{t.banner.title}
						</h1>
					)}

					<p className="orejime-Banner-description">
						{template(t.banner.description, {
							purposes: (
								<strong
									key="purposes"
									className="orejime-Banner-purposes"
								>
									{purposeTitles.join(', ')}
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
					<p className="orejime-Banner-changes">{t.misc.updateNeeded}</p>
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
};

export default Banner;
