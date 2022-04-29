import React from 'react';
import {PurposeGroup as PurposeGroupType} from '../types';
import {useTranslations} from '../utils/hooks';

interface PurposeGroupProps extends Omit<PurposeGroupType, 'purposes'> {
	children: any;
}

const PurposeGroup = ({
	id,
	title,
	description,
	children
}: PurposeGroupProps) => {
	const t = useTranslations();

	return (
		<div className="orejime-PurposeGroup">
			<h2 className="orejime-PurposeGroup-title">
				{t?.[id]?.title || title}
			</h2>

			<p className="orejime-PurposeGroup-description">
				{t?.[id]?.description || description}
			</p>

			<div className="orejime-PurposeGroup-purposes">{children}</div>
		</div>
	);
};

export default PurposeGroup;
