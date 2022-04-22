import React, {Component} from 'react';
import ConsentNoticeWrapper from './ConsentNoticeWrapper';
import ConsentModal from './ConsentModal';
import ConsentManager from '../ConsentManager';
import {Config, Translate} from '../types';

interface Props {
	t: Translate;
	config: Config;
	manager: ConsentManager;
}

interface State {
	isModalVisible: boolean;
}

export default class Main extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			isModalVisible: this.isModalVisible()
		};
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.saveAndHideAll = this.saveAndHideAll.bind(this);
		this.declineAndHideAll = this.declineAndHideAll.bind(this);
		this.acceptAndHideAll = this.acceptAndHideAll.bind(this);
	}

	isModalVisible(userRequest?: boolean) {
		const {config, manager} = this.props;
		if (userRequest) {
			return true;
		}
		if (config.mustConsent && (!manager.confirmed || manager.changed)) {
			return true;
		}
		return false;
	}

	isNoticeVisible() {
		const {config, manager} = this.props;
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

	showModal(e?: Event) {
		if (e !== undefined) {
			e.preventDefault();
		}
		this.setState({isModalVisible: this.isModalVisible(true)});
	}

	hideModal(e?: Event) {
		if (e !== undefined) {
			e.preventDefault();
		}
		this.setState({isModalVisible: this.isModalVisible(false)});
	}

	saveAndHideAll(e?: Event) {
		if (e !== undefined) {
			e.preventDefault();
		}
		this.props.manager.saveAndApplyConsents();
		this.setState({isModalVisible: this.isModalVisible(false)});
	}

	declineAndHideAll() {
		this.props.manager.declineAll();
		this.props.manager.saveAndApplyConsents();
		this.setState({isModalVisible: this.isModalVisible(false)});
	}

	acceptAndHideAll() {
		this.props.manager.acceptAll();
		this.props.manager.saveAndApplyConsents();
		this.setState({isModalVisible: this.isModalVisible(false)});
	}

	render() {
		const {config, t, manager} = this.props;
		const isNoticeVisible = this.isNoticeVisible();
		return (
			<div className="orejime-Main">
				<ConsentNoticeWrapper
					key="notice"
					t={t}
					isVisible={isNoticeVisible}
					isMandatory={config.mustNotice || false}
					isModalVisible={this.state.isModalVisible}
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
					config={config}
					onHideRequest={this.hideModal}
					onSaveRequest={this.saveAndHideAll}
					manager={manager}
				/>
			</div>
		);
	}
}
