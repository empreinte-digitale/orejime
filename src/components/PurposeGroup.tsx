import React from 'react';
import {PurposeGroup as PurposeGroupType} from '../types';

interface PurposeGroupProps extends Omit<PurposeGroupType, 'purposes'> {
	children: any;
}

const PurposeGroup = ({title, description, children}: PurposeGroupProps) => (
	<div className="orejime-PurposeGroup">
		<h2 className="orejime-PurposeGroup-title">{title}</h2>

		{description ? (
			<p className="orejime-PurposeGroup-description">{description}</p>
		) : null}

		<div className="orejime-PurposeGroup-purposes">{children}</div>
	</div>
);

export default PurposeGroup;
