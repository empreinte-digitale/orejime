import React from 'react';
import {PurposeListComponent} from '../../components/types/PurposeList';

const PurposeList: PurposeListComponent = ({children}) => (
	<ul className="orejime-PurposeList">
		{children.map((child) => (
			<li className="orejime-PurposeList-item">{child}</li>
		))}
	</ul>
);

export default PurposeList;
