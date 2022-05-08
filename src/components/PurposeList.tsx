import React from 'react';

interface Props {
	children?: JSX.Element[];
}

const PurposeList = ({children}: Props) => (
	<ul className="orejime-PurposeList">
		{children.map((child) => (
			<li className="orejime-PurposeList-item">{child}</li>
		))}
	</ul>
);

export default PurposeList;
