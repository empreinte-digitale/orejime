import React from 'react';
import ConsentNoticeWrapper from './consent-notice-wrapper';
import ConsentModal from './consent-modal';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalVisible: this.isModalVisible(),
			isNoticeVisible: this.isNoticeVisible()
		};
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.saveAndHideAll = this.saveAndHideAll.bind(this);
		this.declineAndHideAll = this.declineAndHideAll.bind(this);
		this.acceptAndHideAll = this.acceptAndHideAll.bind(this);
	}

	isModalVisible(userRequest) {
		const {config, manager} = this.props;
		if (userRequest) {
			return true;
		}
		if (config.mustConsent && (!manager.confirmed || manager.changed)) {
			return true;
		}
		return false;
	}

	isNoticeVisible(userRequest) {
		const {config, manager} = this.props;
		if (userRequest) {
			return true;
		}
		if (config.mustConsent || config.noNotice) {
			return false;
		}
		if (manager.confirmed && !manager.changed) {
			return false;
		}
		if (manager.canBypassConsent()) {
			return false;
		}
		return true;
	}

	showModal(e) {
		if (e !== undefined) {
			e.preventDefault();
		}
		if (
			!this.state.isNoticeVisible &&
			!this.props.config.mustConsent &&
			this.props.config.mustNotice
		) {
			this.setState({isNoticeVisible: true});
		} else {
			this.setState({isModalVisible: this.isModalVisible(true)});
		}
	}

	hideModal(e, preserveNotice = false) {
		if (e !== undefined) {
			e.preventDefault();
		}
		this.setState((state) => ({
			isModalVisible: this.isModalVisible(false),
			isNoticeVisible: this.isNoticeVisible(
				!state.isNoticeVisible ? false : preserveNotice
			)
		}));
	}

	saveAndHideAll(e) {
		if (e !== undefined) {
			e.preventDefault();
		}
		this.props.manager.saveAndApplyConsents();
		this.hideModal(e);
	}

	declineAndHideAll(e) {
		this.props.manager.declineAll();
		this.props.manager.saveAndApplyConsents();
		this.hideModal(e);
	}

	acceptAndHideAll(e) {
		this.props.manager.acceptAll();
		this.props.manager.saveAndApplyConsents();
		this.hideModal(e);
	}

	render() {
		const {config, t, manager, ns} = this.props;
		const isNoticeVisible = this.isNoticeVisible(this.state.isNoticeVisible);
		return (
			<div className={ns('Main')}>
				<ConsentNoticeWrapper
					key="notice"
					t={t}
					ns={ns}
					isVisible={isNoticeVisible}
					isMandatory={config.mustNotice || false}
					isModalVisible={
						this.state.isNoticeVisible || this.state.isModalVisible
					}
					config={config}
					manager={manager}
					onSaveRequest={this.acceptAndHideAll}
					onDeclineRequest={this.declineAndHideAll}
					onConfigRequest={this.showModal}
				/>
				<ConsentModal
					key="modal"
					isOpen={this.state.isModalVisible}
					t={t}
					ns={ns}
					config={config}
					onHideRequest={(e) => this.hideModal(e, true)}
					onSaveRequest={this.saveAndHideAll}
					manager={manager}
				/>
			</div>
		);
	}
}
