import React from 'react';
import AppList from './app-list';

const pickApps = (apps, names) =>
    names.map((name) =>
        apps.find((app) =>
            app.name === name
        )
    );

const CategorizedAppList = ({t, ns, categories, apps, consents, onToggle}) => (
    <ul className={ns('CategorizedAppList')}>
        {categories.map(({title, description, apps: appNames}) => (
            <li className={ns('CategorizedAppList-item')}>
                <h2 className={ns('CategorizedAppList-title')}>{title}</h2>
                <p className={ns('CategorizedAppList-description')}>{description}</p>

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
