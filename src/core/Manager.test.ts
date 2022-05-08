import Manager from './Manager';
import type {Purpose} from './types';

describe('Manager', () => {
	const purpose = (props: Partial<Purpose> = {}): Purpose => {
		// https://stackoverflow.com/a/28997977
		const id = (Math.random() * 1e20).toString(36);

		return {
			id,
			cookies: [],
			...props
		};
	};

	test('areAllPurposesMandatory', () => {
		const managerA = new Manager([]);

		expect(managerA.areAllPurposesMandatory()).toBeFalsy();

		const managerB = new Manager([purpose(), purpose({isMandatory: true})]);

		expect(managerB.areAllPurposesMandatory()).toBeFalsy();

		const managerC = new Manager([purpose({isMandatory: true})]);

		expect(managerC.areAllPurposesMandatory()).toBeTruthy();
	});

	test('areAllPurposesEnabled', () => {
		const managerA = new Manager([]);

		expect(managerA.areAllPurposesEnabled()).toBeFalsy();

		const managerB = new Manager([purpose(), purpose({default: true})]);

		expect(managerB.areAllPurposesEnabled()).toBeFalsy();

		const managerC = new Manager([purpose({default: true})]);

		expect(managerC.areAllPurposesEnabled()).toBeTruthy();
	});

	test('areAllPurposesDisabled', () => {
		const managerA = new Manager([]);

		expect(managerA.areAllPurposesDisabled()).toBeFalsy();

		const managerB = new Manager([purpose(), purpose({default: true})]);

		expect(managerB.areAllPurposesDisabled()).toBeFalsy();

		const managerC = new Manager([purpose()]);

		expect(managerC.areAllPurposesDisabled()).toBeTruthy();
	});

	test('getConsent', () => {
		const purposeA = purpose();
		const purposeB = purpose();
		const manager = new Manager([purposeA, purposeB], {
			[purposeA.id]: true
		});

		expect(manager.getConsent(purposeA.id)).toBeTruthy();
		expect(manager.getConsent(purposeB.id)).toBeFalsy();
		expect(manager.getConsent('unset')).toBeFalsy();
	});

	test('getAllConsents', () => {
		const purposeA = purpose();
		const purposeB = purpose();
		const consents = {
			[purposeA.id]: true,
			[purposeB.id]: true
		};

		const managerA = new Manager([], consents);

		expect(managerA.getAllConsents()).toEqual({});

		const managerB = new Manager([purposeA], consents);

		expect(managerB.getAllConsents()).toEqual({
			[purposeA.id]: consents[purposeA.id]
		});
	});

	test('acceptAll', () => {
		const purposeA = purpose();
		const purposeB = purpose({
			default: true
		});

		const dirtyCallback = jest.fn();
		const updateCallback = jest.fn();
		const expectedConsents = {
			[purposeA.id]: true,
			[purposeB.id]: true
		};

		const expectedDiff = {
			[purposeA.id]: true
		};

		const manager = new Manager([purposeA, purposeB]);
		manager.on('dirty', dirtyCallback);
		manager.on('update', updateCallback);
		manager.acceptAll();

		expect(manager.getAllConsents()).toEqual(expectedConsents);
		expect(dirtyCallback.mock.calls).toEqual([[false]]);
		expect(updateCallback.mock.calls).toEqual([
			[expectedDiff, expectedConsents]
		]);
	});

	test('declineAll', () => {
		const purposeA = purpose({
			default: true
		});

		const purposeB = purpose({
			isMandatory: true
		});

		const dirtyCallback = jest.fn();
		const updateCallback = jest.fn();
		const expectedConsents = {
			[purposeA.id]: false,
			[purposeB.id]: true
		};

		const expectedDiff = {
			[purposeA.id]: false
		};

		const manager = new Manager([purposeA, purposeB]);
		manager.on('dirty', dirtyCallback);
		manager.on('update', updateCallback);
		manager.declineAll();

		expect(manager.getAllConsents()).toEqual(expectedConsents);
		expect(dirtyCallback.mock.calls).toEqual([[false]]);
		expect(updateCallback.mock.calls).toEqual([
			[expectedDiff, expectedConsents]
		]);
	});
});
