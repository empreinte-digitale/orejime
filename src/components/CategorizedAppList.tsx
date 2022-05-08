import React from 'react';
import {App, Category, Consents, CssNamespace, Translate} from '../types';
import AppList from './AppList';

interface Props {
	t: Translate;
	ns: CssNamespace;
	categories: Category[];
	apps: App[];
	consents: Consents;
	onToggle: (app: App, checked: boolean) => void;
}

const pickApps = (apps: App[], names: string[]) =>
	names.map((name) => apps.find((app) => app.name === name));

const CategorizedAppList = ({
	t,
	ns,
	categories,
	apps,
	consents,
	onToggle
}: Props) => (
	<ul className={ns('CategorizedAppList')}>
		{categories.map(({name, title, description, apps: appNames}) => (
			<li className={ns('CategorizedAppList-item')}>
				<h2 className={ns('CategorizedAppList-title')}>
					{t(['categories', name, 'title']) || title}
				</h2>

				<p className={ns('CategorizedAppList-description')}>
					{t(['categories', name, 'description']) || description}
				</p>

				<div className={ns('CategorizedAppList-apps')}>
					<AppList
						t={t}
						ns={ns}
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
