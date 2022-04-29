import {useContext, useEffect, useRef, useState} from 'react';
import Context from '../components/Context';
import {Consents, ConsentsWatcher} from '../types';

// @see https://stackoverflow.com/a/56818036/2391359
export const useBeforeRender = (callback: () => void) => {
	const willMount = useRef(true);

	if (willMount.current) {
		callback();
	}

	willMount.current = false;
};

export const useConfig = () => {
	const {config} = useContext(Context);
	return config;
};

export const useManager = () => {
	const {manager} = useContext(Context);
	return manager;
};

export const useTranslations = () => {
	const {translations} = useContext(Context);
	return translations;
};

export const useBannerState = () => {
	const config = useConfig();
	const manager = useManager();
	const [isDirty, setIsDirty] = useState(manager.isDirty());

	useEffect(() => {
		const watcher: ConsentsWatcher = {
			update(_, type) {
				if (type === 'save') {
					setIsDirty(manager.isDirty());
				}
			}
		};

		manager.watch(watcher);

		return () => {
			manager.unwatch(watcher);
		};
	});

	if (config.forceModal) {
		return false;
	}

	if (!isDirty) {
		return false;
	}

	if (manager.canBypassConsent()) {
		return false;
	}

	return true;
};

export const useModalState = (): [
	isOpen: boolean,
	open: () => void,
	close: () => void
] => {
	const config = useConfig();
	const manager = useManager();
	const mustOpen = () => config.forceModal && manager.isDirty();

	const [isOpen, setOpen] = useState(mustOpen());
	const open = () => {
		setOpen(true);
	};

	const close = () => {
		setOpen(mustOpen());
	};

	return [isOpen, open, close];
};

export const useConsents = (): Consents => {
	const manager = useManager();
	const [consents, setConsents] = useState({...manager.consents});

	useEffect(() => {
		const watcher: ConsentsWatcher = {
			update(_, type, map) {
				if (type === 'consents') {
					setConsents({...map});
				}
			}
		};

		manager.watch(watcher);

		return () => {
			manager.unwatch(watcher);
		};
	});

	return consents;
};
