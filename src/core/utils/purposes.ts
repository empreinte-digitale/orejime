import {ConsentsMap, Purpose} from '../types';
import {every} from './arrays';

export const isConsentValid = (
	{id, isExempt, isMandatory}: Purpose,
	consents: ConsentsMap
) => (isExempt ? true : isMandatory ? consents?.[id] : id in consents);

export const defaultConsents = (purposes: Purpose[]): ConsentsMap =>
	Object.fromEntries(
		purposes.map(({id, isMandatory, default: d}) => [id, isMandatory || !!d])
	);

export const acceptedConsents = (purposes: Purpose[]): ConsentsMap =>
	Object.fromEntries(purposes.map(({id}) => [id, true]));

export const declinedConsents = (purposes: Purpose[]): ConsentsMap =>
	Object.fromEntries(purposes.map(({id}) => [id, false]));

export const areAllPurposesMandatory = (purposes: Purpose[]) =>
	every(purposes, ({isMandatory}) => isMandatory);

export const areAllPurposesEnabled = (
	purposes: Purpose[],
	consents: ConsentsMap
) => every(purposes, ({id}) => consents?.[id]);

export const areAllPurposesDisabled = (
	purposes: Purpose[],
	consents: ConsentsMap
) => every(purposes, ({id, isMandatory}) => isMandatory || !consents?.[id]);
