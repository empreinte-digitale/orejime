import {createContext} from 'react';
import ConsentManager from '../ConsentManager';
import type {Config, Translations} from '../types';

export interface ContextType {
	config: Config;
	manager: ConsentManager;
	translations: Translations;
}

export default createContext<ContextType>({} as ContextType);
