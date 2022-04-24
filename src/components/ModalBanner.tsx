import React from 'react';
import type {Aria} from 'react-modal';
import Dialog from './Dialog';
import Banner, {BannerProps} from './Banner';

const ModalBanner = ({t, ...props}: BannerProps) => (
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
		<Banner {...props} t={t} isForced />
	</Dialog>
);

export default ModalBanner;
