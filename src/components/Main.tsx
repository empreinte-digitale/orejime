import React, {Component} from 'react';
import ModalConsentBanner from './ModalConsentBanner';
import ConsentBanner from './ConsentBanner';
import ConsentModal from './ConsentModal';
import ConsentManager from '../ConsentManager';
import {Config, Translations} from '../types';

interface Props {
	t: Translations;
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
		if (config.forceModal && manager.isDirty()) {
			return true;
		}
		return false;
	}

	isBannerVisible() {
		const {config, manager} = this.props;
		if (config.forceModal) {
			return false;
		}
		if (!manager.isDirty()) {
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
		const isBannerVisible = this.isBannerVisible();
		const BannerComponent = config.forceBanner
			? ModalConsentBanner
			: ConsentBanner;
		return (
			<div className="orejime-Main">
				{isBannerVisible ? (
					<BannerComponent
						key="banner"
						t={t}
						isModalVisible={this.state.isModalVisible}
						config={config}
						manager={manager}
						purposeTitles={config.purposes.map(({title}) => title)}
						onSaveRequest={this.acceptAndHideAll}
						onDeclineRequest={this.declineAndHideAll}
						onConfigRequest={this.showModal}
					/>
				) : null}

				{this.state.isModalVisible ? (
					<ConsentModal
						key="modal"
						t={t}
						config={config}
						onHideRequest={this.hideModal}
						onSaveRequest={this.saveAndHideAll}
						manager={manager}
					/>
				) : null}
			</div>
		);
	}
}
