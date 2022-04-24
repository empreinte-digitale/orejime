import React from 'react';
import {PurposeGroup as PurposeGroupType, Translations} from '../types';

interface PurposeGroupProps extends Omit<PurposeGroupType, 'purposes'> {
	t: Translations;
	children: any;
}

const PurposeGroup = ({
	t,
	id,
	title,
	description,
	children
}: PurposeGroupProps) => (
	<div className="orejime-PurposeGroup">
		<h2 className="orejime-PurposeGroup-title">{t?.[id]?.title || title}</h2>

		<p className="orejime-PurposeGroup-description">
			{t?.[id]?.description || description}
		</p>

		<div className="orejime-PurposeGroup-purposes">{children}</div>
	</div>
);

export default PurposeGroup;
