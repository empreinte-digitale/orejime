import {ConsentsMap} from './types';

export default interface ConsentsEffect {
	apply(consents: ConsentsMap): void;
}
