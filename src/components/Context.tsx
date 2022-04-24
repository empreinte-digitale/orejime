import {createContext} from 'react';
import {Manager} from '../core';
import type {Config, Translations} from '../types';

export interface ContextType {
	config: Config;
	manager: Manager;
	translations: Translations;
}

export default createContext<ContextType>({} as ContextType);
