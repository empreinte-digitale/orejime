import React from 'react';
import {getPurposes} from '../utils/config';
import Dialog from './dialog';
import ConsentNotice from './consent-notice';

export default class ConsentNoticeWrapper extends React.Component {
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
					portalClassName={this.props.ns('NoticePortal')}
					overlayClassName={this.props.ns('NoticeOverlay')}
					className={this.props.ns('NoticeWrapper')}
				>
					<ConsentNotice {...props} />
				</Dialog>
			);
		}
		return <ConsentNotice {...props} />;
	}
}
