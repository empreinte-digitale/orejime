import React from 'react'
import App from 'components/app.js'
import ConsentManager from 'consent-manager'
import {render} from 'react-dom'
import translations from 'translations'
import {convertToMap, update} from 'utils/maps'
import {t, language} from 'utils/i18n'
import {createCssNamespace} from 'utils/css'

const defaultOptions = {
    configName: 'klaroConfig',
    stylePrefix: 'klaro'
}
const noAutoLoad = document.currentScript.dataset.noAutoLoad == "true"
const inModule = typeof exports === 'object' && typeof module === 'object'
const convertedTranslations = convertToMap(translations)
let currentConfig = null
const managers = {}

// do not autoload if user explicitely asked, or if we are in an environment with modules
if (!inModule && !noAutoLoad) {
    const docScript = document.currentScript
    const originalOnLoad = window.onload
    window.onload = function(e) {
        initialize({
            config: window[docScript.dataset.configName || defaultOptions.configName],
            stylePrefix: docScript.dataset.stylePrefix || defaultOptions.stylePrefix,
        })
        if (originalOnLoad !== null){
            originalOnLoad(e)
        }
    }
}

if (module.hot) {
    if (!noAutoLoad)
        renderKlaro(currentConfig)
    module.hot.accept()
}

export function initialize(opts) {
    const options = {...defaultOptions, ...opts}
    if (!options.config) {
        throw new Error(inModule
            ? 'No Kralo config found. Please initialize Klaro with a `config` key in the options object'
            : 'No Kralo config found. Please make sure window[configName] is set correctly'
        )
    }
    currentConfig = options.config
    renderKlaro(options)
}

function getElementID(config){
    return config.elementID || 'klaro'
}

function getElement(config){
    const id = getElementID(config)
    var element = document.getElementById(id)
    if (element === null){
        element = document.createElement('div')
        element.id = id
        document.body.appendChild(element)
    }
    var child = document.querySelector('.' + stylePrefix + '-AppContainer')
    if (child === null) {
        child = document.createElement('div')
        child.className = stylePrefix + '-AppContainer'
        element.appendChild(child)
    }
    return document.querySelector('.' + stylePrefix + '-AppContainer')
}

function getTranslations(config){
    const trans = new Map([])
    update(trans, convertedTranslations)
    update(trans, convertToMap(config.translations || {}))
    return trans
}

export function renderKlaro({config, stylePrefix}, show){
    if (config === undefined)
        return
    const element = getElement(config)
    const trans = getTranslations(config)
    const manager = getManager(config)
    const lang = config.lang || language()
    const tt = (...args) => {return t(trans, lang, ...args)}
    const app = render(<App t={tt}
                            ns={createCssNamespace(stylePrefix)}
                            manager={manager}
                            config={config}
                            show={show || false} />, element)
    return app
}

export function getManager(config){
    conf = config || currentConfig
    const name = getElementID(conf)
    if (managers[name] === undefined)
        managers[name] = new ConsentManager(conf)
    return managers[name]
}

export function show(config){
    conf = config || currentConfig
    renderKlaro(conf, true)
    return false
}

export function version(){
    return VERSION
}