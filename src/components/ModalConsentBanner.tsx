import React from 'react';
import type {Aria} from 'react-modal';
import Dialog from './Dialog';
import ConsentBanner, {ConsentBannerProps} from './ConsentBanner';

const ModalConsentBanner = ({t, ...props}: ConsentBannerProps) => (
	<Dialog
		config={props.config}
		portalClassName="orejime-BannerPortal"
		overlayClassName="orejime-BannerOverlay"
		className="orejime-BannerWrapper"
		aria={
			{
				label: t.banner.title
			} as Aria
		}
	>
		<ConsentBanner {...props} t={t} isForced />
	</Dialog>
);

export default ModalConsentBanner;
