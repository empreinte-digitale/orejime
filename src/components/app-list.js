import React from 'react';
import AppItem from './app-item';

const AppList = ({t, ns, apps, consents, onToggle}) => (
    <ul className={ns('AppList')}>
        {apps.map((app) => {
            const checked = consents[app.name];
            const handleToggle = (value) =>
                onToggle(app, value);

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
