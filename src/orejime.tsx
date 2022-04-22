import React from 'react';
import {render} from 'react-dom';
import ConsentManager from './ConsentManager';
import translations from './translations';
import Main from './components/Main';
import {convertToMap, update} from './utils/maps';
import {t, language} from './utils/i18n';
import {Config, Translate, TranslationMap} from './types';

function getElement(config: Config) {
	const {elementID: id} = config;
	var element = document.getElementById(id);
	if (element === null) {
		element = document.createElement('div');
		element.id = id;
		document.body.insertBefore(element, document.body.firstChild);
	}
	var child = document.querySelector('.orejime-AppContainer');
	if (child === null) {
		child = document.createElement('div');
		child.className = 'orejime-AppContainer';
		element.appendChild(child);
	}
	return document.querySelector('.orejime-AppContainer');
}

function getTranslations(config: Config) {
	const trans: TranslationMap = new Map([]);
	update(trans, convertToMap(translations));
	update(trans, convertToMap(config.translations));
	return trans;
}

const managers: {[name: string]: ConsentManager} = {};
function getManager(config: Config) {
	const name = config.elementID;
	if (managers[name] === undefined)
		managers[name] = new ConsentManager(config);
	return managers[name];
}

export const defaultConfig: Config = {
	elementID: 'orejime',
	cookieName: 'orejime',
	cookieExpiresAfterDays: 365,
	stringifyCookie: JSON.stringify.bind(JSON),
	parseCookie: JSON.parse.bind(JSON),
	privacyPolicy: '',
	default: true,
	mustConsent: false,
	mustNotice: false,
	logo: false,
	lang: language(),
	translations: {},
	purposes: [],
	debug: false
};

export function init(conf: Config) {
	const config = Object.assign({}, defaultConfig, conf);
	const errors = [];
	if (!Object.keys(config.purposes).length) {
		errors.push('  - you must define `purposes` to manage');
	}
	if (!config.privacyPolicy.length) {
		errors.push('  - you must define a `privacyPolicy` url');
	}
	if (errors.length) {
		errors.unshift('Orejime config error:');
		console.error(errors.join('\n'));
		return;
	}
	const element = getElement(config);
	const trans = getTranslations(config);
	const manager = getManager(config);
	const tt: Translate = (key, ...args) => {
		return t(trans, config.lang, config.debug, key, ...args) as string;
	};
	const app = (render(
		<Main t={tt} manager={manager} config={config} />,
		element
	) as unknown) as Main;
	return {
		show: app.showModal.bind(app),
		internals: {
			react: app,
			manager: manager,
			config: config
		}
	};
}

export default {
	init,
	defaultConfig
};
