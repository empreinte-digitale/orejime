import CookieConsentsRepository from './CookieConsentsRepository';
import CookiesConsentsEffect from './CookiesConsentsEffect';
import DomConsentsEffect from './DomConsentsEffect';
import Manager from './Manager';
import {CookieOptions, Purpose} from './types';

type SetupOptions = {
	cookie?: CookieOptions;
};

export default (purposes: Purpose[], options: SetupOptions) => {
	const domEffect = new DomConsentsEffect(purposes);
	const cookiesEffect = new CookiesConsentsEffect(purposes);
	const repository = new CookieConsentsRepository(options?.cookie);
	const manager = new Manager(purposes, repository.read());
	const consents = manager.getAllConsents();

	manager.on('update', (diff, all) => {
		domEffect.apply(diff);
		cookiesEffect.apply(diff);
		repository.write(all);
	});

	manager.on('clear', () => {
		repository.clear();
	});

	domEffect.apply(consents);
	cookiesEffect.apply(consents);

	return manager;
};
