import React, {
	forwardRef,
	ForwardedRef,
	useImperativeHandle,
	useEffect,
	useRef
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
import {findFirstFocusableChild} from '../utils/dom';

export interface MainHandle {
	openModal: () => void;
}

const Main = (_: any, ref: ForwardedRef<MainHandle>) => {
	const config = useConfig();
	const manager = useManager();
	const isBannerOpen = useBannerState();
	const [isModalOpen, openModal, closeModal] = useModalState();
	const {Banner, Modal, ModalBanner} = useTheme();
	const bannerRef = useRef<HTMLDivElement>();
	const BannerComponent = config.forceBanner ? ModalBanner : Banner;

	// makes openModal() available from the outside
	useImperativeHandle(ref, () => ({
		openModal
	}));

	// moves focus inside the banner once it opens
	useEffect(() => {
		if (isBannerOpen && !isModalOpen && bannerRef.current) {
			findFirstFocusableChild(bannerRef.current)?.focus();
		}
	}, [isBannerOpen]);

	return (
		<div className="orejime-Main orejime-Env">
			{isBannerOpen ? (
				<div ref={bannerRef}>
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
				</div>
			) : null}

			{isModalOpen ? (
				<StubManagerProvider onCommit={closeModal}>
					{(commit) => (
						<Modal
							key="modal"
							isForced={config.forceModal && manager.isDirty()}
							needsUpdate={manager.needsUpdate()}
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
