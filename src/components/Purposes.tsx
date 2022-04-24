import React, {Component} from 'react';
import ConsentManager from '../ConsentManager';
import {Config, Consents, Translations} from '../types';
import PurposeTree from './PurposeTree';

interface PurposesProps {
	t: Translations;
	config: Config;
	manager: ConsentManager;
}

interface PurposesState {
	consents: Consents;
}

export default class Purposes extends Component<PurposesProps, PurposesState> {
	constructor(props: PurposesProps) {
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
		const {t, config, manager} = this.props;
		const purposes = manager.getPurposes();
		const {consents} = this.state;

		const toggleAll = (value: boolean) => {
			purposes.map((purpose) => {
				manager.updateConsent(purpose, value);
			});
		};

		const enableAll = () => toggleAll(true);
		const disableAll = () => toggleAll(false);

		const allDisabled =
			purposes.filter((purpose) => {
				return purpose.isMandatory || false ? false : consents[purpose.id];
			}).length === 0;

		const allEnabled =
			purposes.filter((purpose) => {
				return consents[purpose.id];
			}).length === purposes.length;

		const someOptional = purposes.some((purpose) => !purpose.isMandatory);

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

				<PurposeTree
					t={t}
					purposes={config.purposes}
					consents={consents}
					onToggle={manager.updateConsent.bind(manager)}
				/>
			</div>
		);
	}
}
