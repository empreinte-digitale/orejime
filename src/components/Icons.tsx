import React from 'react';
import {Translations} from '../types';

interface Props {
	t: Translations;
}

export const Close = ({t}: Props) => {
	return (
		<svg
			role="img"
			className="orejime-CloseIcon"
			aria-label={t.close}
			width="12"
			height="12"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{t.close}</title>
			<line x1="1" y1="11" x2="11" y2="1" strokeWidth="1" />
			<line x1="1" y1="1" x2="11" y2="11" strokeWidth="1" />
		</svg>
	);
};
