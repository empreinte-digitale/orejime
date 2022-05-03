import React from 'react';
import type {Aria} from 'react-modal';
import Dialog from '../../components/Dialog';
import Banner from './Banner';
import {useTranslations} from '../../utils/hooks';
import {ModalBannerComponent} from '../../components/types/ModalBanner';

const ModalBanner: ModalBannerComponent = (props) => {
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
			<Banner {...props} />
		</Dialog>
	);
};

export default ModalBanner;
