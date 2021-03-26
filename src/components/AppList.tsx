import React from 'react';
import {App, Consents, CssNamespace, Translate} from '../types';
import AppItem from './AppItem';

interface Props {
	t: Translate;
	ns: CssNamespace;
	apps: App[];
	consents: Consents;
	onToggle: (app: App, checked: boolean) => void;
}

const AppList = ({t, ns, apps, consents, onToggle}: Props) => (
	<ul className={ns('AppList')}>
		{apps.map((app) => {
			const checked = consents[app.name];
			const handleToggle = (value: boolean) => onToggle(app, value);

			return (
				<li
					key={`app-${app.name}`}
					className={ns(`AppList-item AppList-item--${app.name}`)}
				>
					<AppItem
						checked={checked || app.required}
						onToggle={handleToggle}
						t={t}
						ns={ns}
						{...app}
					/>
				</li>
			);
		})}
	</ul>
);

export default AppList;
