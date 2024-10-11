import React from 'react';

interface CloseProps {
	title: string;
}

export const Close = ({title}: CloseProps) => (
	<svg
		role="img"
		className="orejime-CloseIcon"
		aria-label={title}
		viewBox="0 0 12 12"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
	>
		<title>{title}</title>
		<line x1="1" y1="11" x2="11" y2="1" stroke-linecap="round" />
		<line x1="1" y1="1" x2="11" y2="11" stroke-linecap="round" />
	</svg>
);
