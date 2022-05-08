import React, {Component} from 'react';
import ConsentManager from '../ConsentManager';
import {Config, Consents, Translations} from '../types';
import PurposeList from './PurposeList';
import CategorizedPurposeList from './CategorizedPurposeList';

interface Props {
	t: Translations;
	config: Config;
	manager: ConsentManager;
}

interface State {
	consents: Consents;
}

export default class Purposes extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		props.manager.watch(this);
		this.state = {
			consents: props.manager.consents
		};
	}

	componentWillUnmount() {
		const {manager} = this.props;
		manager.unwatch(this);
	}

	update(obj: ConsentManager, type: string, data: Consents) {
		const {manager} = this.props;
		if (obj == manager && type == 'consents') this.setState({consents: data});
	}

	render() {
		const {config, t, manager} = this.props;
		const {consents} = this.state;
		const {purposes, categories} = config;

		const toggleAll = (value: boolean) => {
			purposes.map((purpose) => {
				manager.updateConsent(purpose, value);
			});
		};

		const enableAll = () => toggleAll(true);
		const disableAll = () => toggleAll(false);

		const allDisabled =
			purposes.filter((purpose) => {
				return purpose.required || false ? false : consents[purpose.name];
			}).length === 0;

		const allEnabled =
			purposes.filter((purpose) => {
				return consents[purpose.name];
			}).length === purposes.length;

		const someOptional = purposes.some((purpose) => !purpose.required);

		return (
			<div>
				{someOptional ? (
					<div className="orejime-PurposeToggles">
						<button
							type="button"
							className="orejime-Button orejime-Button--info orejime-PurposeToggles-button orejime-PurposeToggles-enableAll"
							disabled={allEnabled}
							onClick={enableAll}
						>
							{t.modal.acceptAll}
						</button>
						<button
							type="button"
							className="orejime-Button orejime-Button--info orejime-PurposeToggles-button orejime-PurposeToggles-disableAll"
							disabled={allDisabled}
							onClick={disableAll}
						>
							{t.modal.declineAll}
						</button>
					</div>
				) : null}

				{categories ? (
					<CategorizedPurposeList
						t={t}
						categories={categories}
						purposes={purposes}
						consents={consents}
						onToggle={manager.updateConsent.bind(manager)}
					/>
				) : (
					<PurposeList
						t={t}
						purposes={purposes}
						consents={consents}
						onToggle={manager.updateConsent.bind(manager)}
					/>
				)}
			</div>
		);
	}
}
