import {useContext, useEffect, useRef, useState} from 'react';
import Context from '../components/Context';
import {
	acceptedConsents,
	areAllPurposesDisabled,
	areAllPurposesEnabled,
	declinedConsents,
	Purpose
} from '../../core';

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

export const useTranslations = () => {
	const {translations} = useConfig();
	return translations;
};

export const useTheme = () => {
	const {theme} = useContext(Context);
	return theme;
};

export const useManager = () => {
	const {manager} = useContext(Context);
	const [i, refresh] = useState(0);

	// A little hack to rerender the host component whenever
	// consents are updated.
	useEffect(() => {
		const update = () => {
			refresh(i + 1);
		};

		manager.on('update', update);

		return () => {
			manager.off('update', update);
		};
	});

	return manager;
};

export const useBannerState = () => {
	const config = useConfig();
	const manager = useManager();

	if (config.forceModal) {
		return false;
	}

	if (!manager.isDirty()) {
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

export const useConsentGroup = (
	purposes: Purpose[]
): [boolean, boolean, () => void, () => void] => {
	const manager = useManager();

	const acceptAll = () => {
		manager.setConsents(acceptedConsents(purposes));
	};

	const declineAll = () => {
		manager.setConsents(declinedConsents(purposes));
	};

	return [
		areAllPurposesEnabled(purposes, manager.getAllConsents()),
		areAllPurposesDisabled(purposes, manager.getAllConsents()),
		acceptAll,
		declineAll
	];
};

export const useConsent = (
	id: Purpose['id']
): [consent: boolean, setConsent: (consent: boolean) => void] => {
	const manager = useManager();
	return [manager.getConsent(id), manager.setConsent.bind(manager, id)];
};
