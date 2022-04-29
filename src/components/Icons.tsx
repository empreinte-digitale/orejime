import React from 'react';

interface CloseProps {
	title: string;
}

export const Close = ({title}: CloseProps) => (
	<svg
		role="img"
		className="orejime-CloseIcon"
		aria-label={title}
		width="12"
		height="12"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
	>
		<title>{title}</title>
		<line x1="1" y1="11" x2="11" y2="1" strokeWidth="1" />
		<line x1="1" y1="1" x2="11" y2="11" strokeWidth="1" />
	</svg>
);
