import React from 'react'
import {getPurposes} from '../utils/config'

export default class ConsentNotice extends React.Component {
    render() {
        const {
            config,
            manager,
            isModalVisible,
            isMandatory,
            t,
            ns,
            onSaveRequest,
            onDeclineRequest,
            onConfigRequest
        } = this.props

        const purposes = getPurposes(config)
        const purposesText = purposes.map((purpose) => t(['purposes', purpose])).join(", ")
        const title = t(['consentNotice', 'title']);

        return <div aria-hidden={isModalVisible} className={ns(`Notice${isMandatory ? ' Notice--mandatory' : ''}`)}>
            <div className={ns('Notice-body')}>
                {config.logo &&
                    <div className={ns('Notice-logoContainer')}>
                        <img
                            src={typeof config.logo == 'object' ? config.logo.src : config.logo}
                            alt={typeof config.logo == 'object' && config.logo.alt ? config.logo.alt : ''} className={ns('Notice-logo')}
                        />
                    </div>
                }

                <div className={ns('Notice-text')}>
                    {title &&
                        <span className={ns('Notice-title')} id="orejime-notice-title">{title}</span>
                    }

                    <p className={ns('Notice-description')}>
                        {t(['consentNotice', 'description'], {
                            purposes: <strong key="purposes" className={ns('Notice-purposes')}>{purposesText}</strong>
                        })}
                        {t(['consentNotice','privacyPolicy','text'], {
                            privacyPolicy : <a
                                key="privacyPolicyLink"
                                className={ns('Notice-privacyPolicyLink')}
                                href={config.privacyPolicy}
                            >
                                {t(['consentNotice','privacyPolicy','name'])}
                            </a>
                        })}
                    </p>
                </div>

                {manager.changed &&
                    <p className={ns('Notice-changes')}>{t(['consentNotice', 'changeDescription'])}</p>
                }

                <ul className={ns('Notice-actions')}>
                    <li className={ns('Notice-actionItem Notice-actionItem--save')}>
                         <button
                            className={ns('Button Button--save Notice-button Notice-saveButton')}
                            type="button"
                            title={t(['acceptTitle'])}
                            onClick={onSaveRequest}
                        >
                            {t(['accept'])}
                        </button>
                    </li>
                    <li className={ns('Notice-actionItem Notice-actionItem--decline')}>
                         <button
                            className={ns('Button Button--decline Notice-button Notice-declineButton')}
                            type="button"
                            onClick={onDeclineRequest}
                        >
                            {t(['decline'])}
                        </button>
                    </li>
                    <li className={ns('Notice-actionItem Notice-actionItem--info')}>
                         <button
                            type="button"
                            className={ns('Button Button--info Notice-learnMoreButton')}
                            onClick={onConfigRequest}
                        >
                            {t(['consentNotice', 'learnMore'])}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    }
}
