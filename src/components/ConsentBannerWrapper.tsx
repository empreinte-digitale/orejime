import React, {Component} from 'react';
import Dialog from './Dialog';
import ConsentBanner, {Props as ConsentBannerProps} from './ConsentBanner';
import {Config, Translations} from '../types';

interface Props extends ConsentBannerProps {
	t: Translations;
	config: Config;
	isVisible: boolean;
	isMandatory: boolean;
}

export default class ConsentBannerWrapper extends Component<Props> {
	render() {
		const {isVisible, ...props} = this.props;
		if (!this.props.isMandatory && !isVisible) {
			return null;
		}
		const title = this.props.t.consentBanner.title;
		const ariaProp = title
			? {aria: {'labelledby': 'orejime-Banner-title'}}
			: {};
		if (this.props.isMandatory) {
			return (
				<Dialog
					isOpen={isVisible}
					{...ariaProp}
					config={this.props.config}
					portalClassName="orejime-BannerPortal"
					overlayClassName="orejime-BannerOverlay"
					className="orejime-BannerWrapper"
				>
					<ConsentBanner {...props} />
				</Dialog>
			);
		}
		return <ConsentBanner {...props} />;
	}
}
