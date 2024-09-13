import {BannerComponent} from './Banner';
import {EmbeddedConsentComponent} from './EmbeddedConsent';
import {GlobalConsentComponent} from './GlobalConsent';
import {ModalComponent} from './Modal';
import {ModalBannerComponent} from './ModalBanner';
import {PurposeComponent} from './Purpose';
import {PurposeListComponent} from './PurposeList';

export interface Theme {
	Banner: BannerComponent;
	EmbeddedConsent: EmbeddedConsentComponent;
	GlobalConsent: GlobalConsentComponent;
	Modal: ModalComponent;
	ModalBanner: ModalBannerComponent;
	Purpose: PurposeComponent;
	PurposeList: PurposeListComponent;
}
