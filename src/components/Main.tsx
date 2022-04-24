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
	useConsents,
	useManager,
	useModalState
} from '../utils/hooks';
import PurposeTree from './PurposeTree';
import {GlobalPurpose} from './GlobalPurpose';

interface MainHandle {
	openModal: () => void;
}

const Main: ForwardRefRenderFunction<MainHandle> = (_, ref) => {
	const config = useConfig();
	const manager = useManager();
	const isBannerVisible = useBannerState();
	const [isModalVisible, openModal, closeModal] = useModalState();
	const {
		consents,
		areAllEnabled,
		areAllDisabled,
		areAllMandatory,
		acceptAll,
		declineAll
	} = useConsents();

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
					isHidden={isModalVisible}
					hasChanges={manager.changed}
					purposeTitles={config.purposes.map(({title}) => title)}
					privacyPolicyUrl={config.privacyPolicyUrl}
					logo={config.logo}
					onAccept={acceptAndHideAll}
					onDecline={declineAndHideAll}
					onConfigure={openModal}
				/>
			) : null}

			{isModalVisible ? (
				<Modal
					key="modal"
					isForced={config.forceModal && manager.isDirty()}
					privacyPolicyUrl={config.privacyPolicyUrl}
					onClose={closeModal}
					onSave={saveAndHideAll}
				>
					{areAllMandatory ? null : (
						<GlobalPurpose
							areAllEnabled={areAllEnabled}
							areAllDisabled={areAllDisabled}
							acceptAll={acceptAll}
							declineAll={declineAll}
						/>
					)}

					<PurposeTree
						purposes={config.purposes}
						consents={consents}
						onToggle={manager.updateConsent.bind(manager)}
					/>
				</Modal>
			) : null}
		</div>
	);
};

export default forwardRef(Main);
