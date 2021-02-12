import React from 'react'
import AppList from './app-list';
import CategorizedAppList from './categorized-app-list';

export default class Apps extends React.Component {
    constructor(props, context){
        super(props, context)
        props.manager.watch(this)
        this.state = {
            consents : props.manager.consents
        }
    }

    componentWillUnmount(){
        const {manager} = this.props
        manager.unwatch(this)
    }

    update(obj, type, data){
        const {manager} = this.props
        if (obj == manager && type == 'consents')
            this.setState({consents : data})
    }

    render(){
        const {config, t, ns, manager} = this.props
        const {consents} = this.state
        const {apps, categories} = config

        const toggleAll = (value) => {
            apps.map((app)=>{
                manager.updateConsent(app, value)
            })
        }

        const enableAll = () => toggleAll(true)
        const disableAll = () => toggleAll(false)

        const allDisabled = apps.filter((app) => {
            return (app.required || false)
                ? false
                : consents[app.name]
        }).length === 0

        const allEnabled = apps.filter((app) => {
            return consents[app.name]
        }).length === apps.length

        const someOptional = apps.some((app) => !app.required);

        return (
            <div>
                {someOptional ? (
                    <div className={ns('AppToggles')}>
                        <button
                            type="button"
                            className={ns('Button Button--info AppToggles-button AppToggles-enableAll')}
                            disabled={allEnabled}
                            onClick={enableAll}
                        >
                            {t(['acceptAll'])}
                        </button>
                        <button
                            type="button"
                            className={ns('Button Button--info AppToggles-button AppToggles-disableAll')}
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
                        ns={ns}
                        categories={categories}
                        apps={apps}
                        consents={consents}
                        onToggle={manager.updateConsent}
                    />
                ) : (
                    <AppList
                        t={t}
                        ns={ns}
                        apps={apps}
                        consents={consents}
                        onToggle={manager.updateConsent}
                    />
                )}
            </div>
        );
    }
}
