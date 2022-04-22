import React, {Component} from 'react';
import Dialog from './Dialog';
import ConsentNotice, {Props as ConsentNoticeProps} from './ConsentNotice';
import {Config, Translate} from '../types';

interface Props extends ConsentNoticeProps {
	t: Translate;
	config: Config;
	isVisible: boolean;
	isMandatory: boolean;
}

export default class ConsentNoticeWrapper extends Component<Props> {
	render() {
		const {isVisible, ...props} = this.props;
		if (!this.props.isMandatory && !isVisible) {
			return null;
		}
		const title = this.props.t(['consentNotice', 'title']);
		const ariaProp = title
			? {aria: {'labelledby': 'orejime-notice-title'}}
			: {};
		if (this.props.isMandatory) {
			return (
				<Dialog
					isOpen={isVisible}
					{...ariaProp}
					config={this.props.config}
					portalClassName="orejime-NoticePortal"
					overlayClassName="orejime-NoticeOverlay"
					className="orejime-NoticeWrapper"
				>
					<ConsentNotice {...props} />
				</Dialog>
			);
		}
		return <ConsentNotice {...props} />;
	}
}
