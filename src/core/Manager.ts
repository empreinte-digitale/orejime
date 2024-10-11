import EventEmitter from './EventEmitter';
import type {Purpose, ConsentsMap} from './types';
import {withoutAll} from './utils/arrays';
import {diff, overwrite} from './utils/objects';
import {
	acceptedConsents,
	areAllPurposesDisabled,
	areAllPurposesEnabled,
	areAllPurposesMandatory,
	declinedConsents,
	defaultConsents,
	isConsentValid
} from './utils/purposes';

type ManagerEvents = {
	dirty: (dirty: boolean) => void;
	update: (diff: ConsentsMap, all: ConsentsMap) => void;
	clear: () => void;
};

export default class Manager extends EventEmitter<ManagerEvents> {
	readonly #purposes: Purpose[];
	readonly #mandatoryConsents: ConsentsMap;
	readonly #defaultConsents: ConsentsMap;
	#invalidConsentsIds: Purpose['id'][];
	#isInitiallyInvalid: boolean;
	#consents: ConsentsMap;

	constructor(purposes: Purpose[], consents: ConsentsMap = {}) {
		super();

		// The manager will be considered dirty until these
		// consents are made valid (i.e. set, and set
		// accordingly to their mandatory status)
		this.#invalidConsentsIds = purposes
			.filter((purpose) => !isConsentValid(purpose, consents))
			.map(({id}) => id);

		this.#defaultConsents = defaultConsents(purposes);
		this.#mandatoryConsents = acceptedConsents(
			purposes.filter(({isMandatory}) => isMandatory)
		);

		this.#purposes = purposes;
		this.#consents = overwrite(this.#defaultConsents, consents);

		this.#isInitiallyInvalid =
			Object.keys(consents).length > 0 &&
			this.#invalidConsentsIds.length > 0;
	}

	// Clones data, but not event handlers.
	clone() {
		return new Manager(this.#purposes, this.getAllConsents());
	}

	isDirty() {
		return this.#invalidConsentsIds.length > 0;
	}

	needsUpdate() {
		return this.#isInitiallyInvalid;
	}

	areAllPurposesMandatory() {
		return areAllPurposesMandatory(this.#purposes);
	}

	areAllPurposesEnabled() {
		return areAllPurposesEnabled(this.#purposes, this.#consents);
	}

	areAllPurposesDisabled() {
		return areAllPurposesDisabled(this.#purposes, this.#consents);
	}

	getConsent(id: Purpose['id']) {
		return this.#consents?.[id];
	}

	getAllConsents() {
		return {...this.#consents};
	}

	acceptAll() {
		this.setConsents(acceptedConsents(this.#purposes));
	}

	declineAll() {
		this.setConsents(declinedConsents(this.#purposes));
	}

	setConsent(id: Purpose['id'], state: boolean) {
		this.setConsents({
			[id]: state
		});
	}

	setConsents(consents: ConsentsMap) {
		this.#updateConsents(consents);
		this.#updateInvalidConsents(
			withoutAll(this.#invalidConsentsIds, Object.keys(consents))
		);
	}

	resetConsents() {
		this.setConsents({...this.#defaultConsents});
	}

	clearConsents() {
		this.#updateConsents({...this.#defaultConsents});
		this.#updateInvalidConsents(
			withoutAll(
				this.#purposes.map(({id}) => id),
				Object.keys(this.#mandatoryConsents)
			)
		);

		this.emit('clear');
	}

	#updateConsents(consents: ConsentsMap) {
		const fixed = overwrite(consents, this.#mandatoryConsents);
		const updated = diff(this.#consents, fixed);

		this.#consents = {
			...this.#consents,
			...fixed
		};

		this.emit('update', updated, {...this.#consents});
	}

	#updateInvalidConsents(ids: Purpose['id'][]) {
		this.#invalidConsentsIds = ids;

		if (this.#invalidConsentsIds.length === 0) {
			this.#isInitiallyInvalid = false;
		}

		this.emit('dirty', this.isDirty());
	}
}
