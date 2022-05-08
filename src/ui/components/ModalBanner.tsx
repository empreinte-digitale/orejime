import React from 'react';
import type {Aria} from 'react-modal';
import Dialog from './Dialog';
import Banner, {BannerProps} from './Banner';
import {useTranslations} from '../utils/hooks';

const ModalBanner = (props: BannerProps) => {
	const t = useTranslations();

	return (
		<Dialog
			portalClassName="orejime-BannerPortal"
			overlayClassName="orejime-BannerOverlay"
			className="orejime-BannerWrapper"
			aria={
				{
					label: t.banner.title
				} as Aria
			}
		>
			<Banner {...props} isForced />
		</Dialog>
	);
};

export default ModalBanner;
