import React, {Component} from 'react';
import ConsentManager from '../ConsentManager';
import {Config, Consents, Translate} from '../types';
import AppList from './AppList';
import CategorizedAppList from './CategorizedAppList';

interface Props {
	t: Translate;
	config: Config;
	manager: ConsentManager;
}

interface State {
	consents: Consents;
}

export default class Apps extends Component<Props, State> {
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
		const {apps, categories} = config;

		const toggleAll = (value: boolean) => {
			apps.map((app) => {
				manager.updateConsent(app, value);
			});
		};

		const enableAll = () => toggleAll(true);
		const disableAll = () => toggleAll(false);

		const allDisabled =
			apps.filter((app) => {
				return app.required || false ? false : consents[app.name];
			}).length === 0;

		const allEnabled =
			apps.filter((app) => {
				return consents[app.name];
			}).length === apps.length;

		const someOptional = apps.some((app) => !app.required);

		return (
			<div>
				{someOptional ? (
					<div className="orejime-AppToggles">
						<button
							type="button"
							className="orejime-Button orejime-Button--info orejime-AppToggles-button orejime-AppToggles-enableAll"
							disabled={allEnabled}
							onClick={enableAll}
						>
							{t(['acceptAll'])}
						</button>
						<button
							type="button"
							className="orejime-Button orejime-Button--info orejime-AppToggles-button orejime-AppToggles-disableAll"
							disabled={allDisabled}
							onClick={disableAll}
						>
							{t(['declineAll'])}
						</button>
					</div>
				) : null}

				{categories ? (
					<CategorizedAppList
						t={t}
						categories={categories}
						apps={apps}
						consents={consents}
						onToggle={manager.updateConsent.bind(manager)}
					/>
				) : (
					<AppList
						t={t}
						apps={apps}
						consents={consents}
						onToggle={manager.updateConsent.bind(manager)}
					/>
				)}
			</div>
		);
	}
}
