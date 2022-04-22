import React from 'react';
import {App, Consents, Translate} from '../types';
import AppItem from './AppItem';

interface Props {
	t: Translate;
	apps: App[];
	consents: Consents;
	onToggle: (app: App, checked: boolean) => void;
}

const AppList = ({t, apps, consents, onToggle}: Props) => (
	<ul className="orejime-AppList">
		{apps.map((app) => {
			const checked = consents[app.name];
			const handleToggle = (value: boolean) => onToggle(app, value);

			return (
				<li
					key={`app-${app.name}`}
					className={`orejime-AppList-item orejime-AppList-item--${app.name}`}
				>
					<AppItem
						checked={checked || app.required}
						onToggle={handleToggle}
						t={t}
						{...app}
					/>
				</li>
			);
		})}
	</ul>
);

export default AppList;
