import React from 'react';
import {useTranslations} from '../../utils/hooks';
import Dialog from '../../components/Dialog';
import type {ModalBannerComponent} from '../../components/types/ModalBanner';
import Banner from './Banner';

const ModalBanner: ModalBannerComponent = ({...props}) => {
	const t = useTranslations();

	return (
		<Dialog
			htmlClassName="fr-no-scroll"
			portalClassName="orejime-banner-portal"
			overlayClassName="orejime-banner-overlay"
			className="fr-modal fr-modal--opened"
			label={t.banner.title}
		>
			<Banner {...props} isForced />
		</Dialog>
	);
};

export default ModalBanner;
