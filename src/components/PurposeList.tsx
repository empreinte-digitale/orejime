import React from 'react';

interface PurposeListProps {
	children?: JSX.Element[];
}

const PurposeList = ({children}: PurposeListProps) => (
	<ul className="orejime-PurposeList">
		{children.map((child) => (
			<li className="orejime-PurposeList-item">{child}</li>
		))}
	</ul>
);

export default PurposeList;
