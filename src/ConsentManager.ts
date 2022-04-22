import {Purpose, Config, Consents, ConsentsWatcher} from './types';
import {getCookie, getCookies, setCookie, deleteCookie} from './utils/cookies';

// temporary fix to avoid touching the code for now
declare global {
	interface HTMLElement {
		[attr: string]: any;
	}
}

export default class ConsentManager {
	public confirmed: boolean;
	public changed: boolean;
	public consents: Consents;
	private config: Config;
	private states: {[appName: string]: boolean};
	private executedOnce: {[appName: string]: boolean};
	private watchers: Set<ConsentsWatcher>;

	constructor(config: Config) {
		this.config = config; // the configuration
		this.consents = this.defaultConsents; // the consent states of the configured purposes
		this.confirmed = false; // true if the user actively confirmed his/her consent
		this.changed = false; // true if the purpose config changed compared to the cookie
		this.states = {}; // keep track of the change (enabled, disabled) of individual purposes
		this.executedOnce = {}; //keep track of which purposes have been executed at least once
		this.watchers = new Set([]);
		this.loadConsents();
		this.applyConsents();
	}

	get cookieName() {
		return this.config.cookieName || 'orejime';
	}

	watch(watcher: ConsentsWatcher) {
		if (!this.watchers.has(watcher)) this.watchers.add(watcher);
	}

	unwatch(watcher: ConsentsWatcher) {
		if (this.watchers.has(watcher)) this.watchers.delete(watcher);
	}

	notify(name: string, data: Consents) {
		this.watchers.forEach((watcher: ConsentsWatcher) => {
			watcher.update(this, name, data);
		});
	}

	getPurpose(name: string) {
		const matching = this.config.purposes.filter((purpose) => {
			return purpose.name == name;
		});
		if (matching.length > 0) return matching[0];
		return undefined;
	}

	getDefaultConsent(purpose: Purpose) {
		let consent = purpose.default;
		if (consent === undefined) consent = false;
		return consent;
	}

	get defaultConsents() {
		const consents: Consents = {};
		for (var i = 0; i < this.config.purposes.length; i++) {
			const purpose = this.config.purposes[i];
			consents[purpose.name] = this.getDefaultConsent(purpose);
		}
		return consents;
	}

	// If every app is either required or optOut, or both,
	// there is no need to ask for user consent.
	canBypassConsent() {
		return this.config.purposes.every(
			({optOut = false, required = false}) => optOut || required
		);
	}

	declineAll() {
		this.config.purposes.map((purpose) => {
			this.updateConsent(purpose, false);
		});
	}

	acceptAll() {
		this.config.purposes.map((purpose) => {
			this.updateConsent(purpose, true);
		});
	}

	updateConsent(purpose: Purpose, value: boolean) {
		if (purpose.required && !value) {
			return;
		}
		this.consents[purpose.name] = value;
		this.notify('consents', this.consents);
	}

	resetConsent() {
		this.consents = this.defaultConsents;
		this.confirmed = false;
		this.applyConsents();
		deleteCookie(this.cookieName);
		this.notify('consents', this.consents);
	}

	getConsent(name: string) {
		return this.consents[name] || false;
	}

	_checkConsents() {
		let complete = true;
		const purposeNames = this.config.purposes.map((purpose) => purpose.name);
		Object.keys(this.consents).forEach(
			function (key: string) {
				if (purposeNames.indexOf(key) === -1) {
					delete this.consents[key];
				}
			}.bind(this)
		);
		this.config.purposes.forEach(
			function (purpose: Purpose) {
				if (typeof this.consents[purpose.name] === 'undefined') {
					this.consents[purpose.name] = this.getDefaultConsent(purpose);
					complete = false;
				}
			}.bind(this)
		);
		this.confirmed = complete;
		if (!complete) this.changed = true;
	}

	loadConsents() {
		const consentCookie = getCookie(this.cookieName);
		if (consentCookie !== null && consentCookie.value !== '') {
			this.consents = this.config.parseCookie(consentCookie.value);
			this._checkConsents();
			this.notify('consents', this.consents);
		}
		return this.consents;
	}

	saveAndApplyConsents() {
		this.saveConsents();
		this.applyConsents();
	}

	saveConsents() {
		if (this.consents === null) deleteCookie(this.cookieName);
		const value = this.config.stringifyCookie(this.consents);

		setCookie(
			this.cookieName,
			value,
			this.config.cookieExpiresAfterDays || 120,
			this.config.cookieDomain
		);

		this.confirmed = true;
		this.changed = false;
	}

	applyConsents() {
		for (var i = 0; i < this.config.purposes.length; i++) {
			const purpose = this.config.purposes[i];
			const state = this.states[purpose.name];
			const confirmed = this.confirmed || !!purpose.optOut;
			const consent = this.getConsent(purpose.name) && confirmed;
			if (state === consent) continue;
			this.updatePurposeElements(purpose, consent);
			this.updatePurposeCookies(purpose, consent);
			if (purpose.callback !== undefined) purpose.callback(consent, purpose);
			this.states[purpose.name] = consent;
		}
	}

	updatePurposeElements(purpose: Purpose, consent: boolean) {
		// we make sure we execute this purpose only once if the option is set
		if (consent) {
			if (purpose.onlyOnce && this.executedOnce[purpose.name]) return;
			this.executedOnce[purpose.name] = true;
		}

		const elements = document.querySelectorAll<HTMLElement>(
			"[data-name='" + purpose.name + "']"
		);
		for (var i = 0; i < elements.length; i++) {
			const element = elements[i];

			const parent = element.parentElement;
			const {dataset} = element;
			const {type, name} = dataset;
			const attrs = ['href', 'src'];

			//if no consent was given we disable this tracker
			//we remove and add it again to trigger a re-execution

			if (element.tagName == 'SCRIPT') {
				// we create a new script instead of updating the node in
				// place, as the script won't start correctly otherwise
				const newElement = document.createElement('script');
				for (var key of Object.keys(dataset)) {
					newElement.dataset[key] = dataset[key];
				}
				newElement.type = 'opt-in';
				newElement.innerText = element.innerText;
				newElement.text = element.text;
				newElement.class = element.class;
				newElement.style.cssText = (element.style as unknown) as string;
				newElement.id = element.id;
				newElement.name = element.name;
				newElement.defer = element.defer;
				newElement.async = element.async;

				if (consent) {
					newElement.type = type;
					if (dataset.src !== undefined) newElement.src = dataset.src;
				}
				//we remove the original element and insert a new one
				parent.insertBefore(newElement, element);
				parent.removeChild(element);
			} else {
				// all other elements (images etc.) are modified in place...
				if (consent) {
					for (var attr of attrs) {
						const attrValue = dataset[attr];
						if (attrValue === undefined) continue;
						if (dataset['original' + attr] === undefined)
							dataset['original' + attr] = element[attr];
						element[attr] = attrValue;
					}
					if (dataset.title !== undefined) element.title = dataset.title;
					if (dataset.originalDisplay !== undefined)
						element.style.display = dataset.originalDisplay;
				} else {
					if (dataset.title !== undefined)
						element.removeAttribute('title');
					if (dataset.hide === 'true') {
						if (dataset.originalDisplay === undefined)
							dataset.originalDisplay = element.style.display;
						element.style.display = 'none';
					}
					for (var attr of attrs) {
						const attrValue = dataset[attr];
						if (attrValue === undefined) continue;
						if (dataset['original' + attr] !== undefined)
							element[attr] = dataset['original' + attr];
					}
				}
			}
		}
	}

	updatePurposeCookies(purpose: Purpose, consent: boolean) {
		if (consent) return;

		function escapeRegexStr(str: string) {
			return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
		}

		if (purpose.cookies !== undefined && purpose.cookies.length > 0) {
			const cookies = getCookies();
			for (var i = 0; i < purpose.cookies.length; i++) {
				let cookiePattern = purpose.cookies[i];
				let cookiePath, cookieDomain;
				if (cookiePattern instanceof Array) {
					[cookiePattern, cookiePath, cookieDomain] = cookiePattern;
				}
				if (!(cookiePattern instanceof RegExp)) {
					cookiePattern = new RegExp(
						'^' + escapeRegexStr(cookiePattern) + '$'
					);
				}
				for (var j = 0; j < cookies.length; j++) {
					const cookie = cookies[j];
					const match = cookiePattern.exec(cookie.name);
					if (match !== null) {
						deleteCookie(cookie.name, cookiePath, cookieDomain);
					}
				}
			}
		}
	}
}
