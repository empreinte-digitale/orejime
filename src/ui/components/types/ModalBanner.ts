import {FC} from 'react';
import {BannerProps} from './Banner';

export interface ModalBannerProps extends BannerProps {}

export type ModalBannerComponent = FC<ModalBannerProps>;
