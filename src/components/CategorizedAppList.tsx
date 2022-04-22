import React from 'react';
import {App, Category, Consents, Translate} from '../types';
import AppList from './AppList';

interface Props {
	t: Translate;
	categories: Category[];
	apps: App[];
	consents: Consents;
	onToggle: (app: App, checked: boolean) => void;
}

const pickApps = (apps: App[], names: string[]) =>
	names.map((name) => apps.find((app) => app.name === name));

const CategorizedAppList = ({
	t,
	categories,
	apps,
	consents,
	onToggle
}: Props) => (
	<ul className="orejime-CategorizedAppList">
		{categories.map(({name, title, description, apps: appNames}) => (
			<li className="orejime-CategorizedAppList-item">
				<h2 className="orejime-CategorizedAppList-title">
					{t(['categories', name, 'title']) || title}
				</h2>

				<p className="orejime-CategorizedAppList-description">
					{t(['categories', name, 'description']) || description}
				</p>

				<div className="orejime-CategorizedAppList-apps">
					<AppList
						t={t}
						apps={pickApps(apps, appNames)}
						consents={consents}
						onToggle={onToggle}
					/>
				</div>
			</li>
		))}
	</ul>
);

export default CategorizedAppList;
