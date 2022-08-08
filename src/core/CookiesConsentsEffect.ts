import ConsentsEffect from './ConsentsEffect';
import {ConsentsMap, Purpose} from './types';
import {indexBy} from './utils/arrays';
import deletePurposeCookies from './utils/deletePurposeCookies';

export default class CookiesConsentsEffect implements ConsentsEffect {
	readonly #purposes: Record<Purpose['id'], Purpose>;

	constructor(purposes: Purpose[]) {
		this.#purposes = indexBy(purposes, 'id');
	}

	apply(consents: ConsentsMap) {
		Object.entries(consents)
			.filter(([_, consent]) => !consent)
			.map(([id]) => this.#purposes[id].cookies)
			.filter((cookies) => cookies?.length)
			.forEach(deletePurposeCookies);
	}
}
