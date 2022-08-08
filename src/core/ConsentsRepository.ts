import {ConsentsMap} from './types';

export default interface ConsentsRepository {
	read(): ConsentsMap;
	write(consents: ConsentsMap): void;
	clear(): void;
}
