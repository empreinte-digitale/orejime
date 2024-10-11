import {createContext} from 'react';
import {Manager} from '../../core';
import type {Config} from '../types';

export interface ContextType {
	config: Config;
	manager: Manager;
}

export default createContext<ContextType>({} as ContextType);
