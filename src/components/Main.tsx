import React, {
	forwardRef,
	ForwardRefRenderFunction,
	useImperativeHandle
} from 'react';
import ModalBanner from './ModalBanner';
import Banner from './Banner';
import Modal from './Modal';
import {
	useBannerState,
	useConfig,
	useManager,
	useModalState
} from '../utils/hooks';

interface MainHandle {
	openModal: () => void;
}

const Main: ForwardRefRenderFunction<MainHandle> = (_, ref) => {
	const config = useConfig();
	const manager = useManager();
	const isBannerVisible = useBannerState();
	const [isModalVisible, openModal, closeModal] = useModalState();
	const BannerComponent = config.forceBanner ? ModalBanner : Banner;

	const saveAndHideAll = () => {
		manager.saveAndApplyConsents();
		closeModal();
	};

	const declineAndHideAll = () => {
		manager.declineAll();
		manager.saveAndApplyConsents();
	};

	const acceptAndHideAll = () => {
		manager.acceptAll();
		manager.saveAndApplyConsents();
	};

	// makes openModal() available from the outside
	useImperativeHandle(ref, () => ({
		openModal
	}));

	return (
		<div className="orejime-Main">
			{isBannerVisible ? (
				<BannerComponent
					key="banner"
					isModalVisible={isModalVisible}
					purposeTitles={config.purposes.map(({title}) => title)}
					onSaveRequest={acceptAndHideAll}
					onDeclineRequest={declineAndHideAll}
					onConfigRequest={openModal}
				/>
			) : null}

			{isModalVisible ? (
				<Modal
					key="modal"
					onHideRequest={closeModal}
					onSaveRequest={saveAndHideAll}
				/>
			) : null}
		</div>
	);
};

export default forwardRef(Main);
