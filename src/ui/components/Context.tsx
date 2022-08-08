import {createContext} from 'react';
import {Manager} from '../../core';
import {Theme} from './types/Theme';
import type {Config} from '../types';

export interface ContextType {
	config: Config;
	manager: Manager;
	theme: Theme;
}

export default createContext<ContextType>({} as ContextType);
