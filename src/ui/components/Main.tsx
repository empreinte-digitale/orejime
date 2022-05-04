import React, {
	forwardRef,
	ForwardRefRenderFunction,
	useImperativeHandle
} from 'react';
import {
	useBannerState,
	useConfig,
	useManager,
	useModalState,
	useTheme
} from '../utils/hooks';
import PurposeTree from './PurposeTree';
import StubManagerProvider from './StubManagerProvider';
import GlobalConsentContainer from './GlobalConsentContainer';

interface MainHandle {
	openModal: () => void;
}

const Main: ForwardRefRenderFunction<MainHandle> = (_, ref) => {
	const config = useConfig();
	const manager = useManager();
	const isBannerOpen = useBannerState();
	const [isModalOpen, openModal, closeModal] = useModalState();
	const {Banner, Modal, ModalBanner} = useTheme();
	const BannerComponent = config.forceBanner ? ModalBanner : Banner;

	// makes openModal() available from the outside
	useImperativeHandle(ref, () => ({
		openModal
	}));

	return (
		<div className="orejime-Main">
			{isBannerOpen ? (
				<BannerComponent
					key="banner"
					isHidden={isModalOpen}
					needsUpdate={manager.needsUpdate()}
					purposeTitles={config.purposes.map(({title}) => title)}
					privacyPolicyUrl={config.privacyPolicyUrl}
					logo={config.logo}
					onConfigure={openModal}
					onAccept={() => {
						manager.acceptAll();
						closeModal();
					}}
					onDecline={() => {
						manager.declineAll();
						closeModal();
					}}
				/>
			) : null}

			{isModalOpen ? (
				<StubManagerProvider onCommit={closeModal}>
					{(commit) => (
						<Modal
							key="modal"
							isForced={config.forceModal && manager.isDirty()}
							privacyPolicyUrl={config.privacyPolicyUrl}
							onClose={closeModal}
							onSave={commit}
						>
							{manager.areAllPurposesMandatory() ? null : (
								<GlobalConsentContainer />
							)}

							<PurposeTree purposes={config.purposes} />
						</Modal>
					)}
				</StubManagerProvider>
			) : null}
		</div>
	);
};

export default forwardRef(Main);
