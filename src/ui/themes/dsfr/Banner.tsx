import React from 'react';
import {useTranslations} from '../../utils/hooks';
import {template} from '../../utils/template';
import type {BannerComponent} from '../../components/types/Banner';

const Banner: BannerComponent = ({
	needsUpdate,
	isHidden,
	purposeTitles,
	privacyPolicyUrl,
	onAccept,
	onDecline,
	onConfigure
}) => {
	const t = useTranslations();

	return (
		<div className="fr-consent-banner" aria-hidden={isHidden}>
			{t.banner.title ? <h2 className="fr-h6">{t.banner.title}</h2> : null}

			<div className="fr-consent-banner__content">
				<p className="fr-text--sm">
					{template(t.banner.description, {
						purposes: (
							<strong key="purposes">{purposeTitles.join(', ')}</strong>
						),
						privacyPolicy: (
							<a key="privacyPolicyUrl" href={privacyPolicyUrl}>
								{t.banner.privacyPolicyLabel}
							</a>
						)
					})}
				</p>

				{needsUpdate && (
					<p className="fr-text--sm">{t.misc.updateNeeded}</p>
				)}
			</div>

			<ul className="fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm">
				<li>
					<button
						className="fr-btn"
						title={t.banner.acceptTitle}
						onClick={onAccept}
					>
						{t.banner.accept}
					</button>
				</li>
				<li>
					<button
						className="fr-btn"
						title={t.banner.declineTitle}
						onClick={onDecline}
					>
						{t.banner.decline}
					</button>
				</li>
				<li>
					<button
						className="fr-btn fr-btn--secondary"
						title={t.banner.configureTitle}
						onClick={onConfigure}
					>
						{t.banner.configure}
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Banner;
