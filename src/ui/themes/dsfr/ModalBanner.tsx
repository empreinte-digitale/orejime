import React from 'react';
import type {Aria} from 'react-modal';
import {useTranslations} from '../../utils/hooks';
import Dialog from '../../components/Dialog';
import type {ModalBannerComponent} from '../../components/types/ModalBanner';
import Banner from './Banner';

const ModalBanner: ModalBannerComponent = ({...props}) => {
	const t = useTranslations();

	return (
		<Dialog
			htmlOpenClassName="fr-no-scroll"
			portalClassName="orejime-banner-portal"
			overlayClassName="orejime-banner-overlay"
			className="fr-modal fr-modal--opened"
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
