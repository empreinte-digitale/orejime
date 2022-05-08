import React from 'react';
import type {
	PurposeList as PurposeListType,
	Purpose as PurposeType,
	Translations,
	Consents
} from '../types';
import PurposeGroup from './PurposeGroup';
import PurposeList from './PurposeList';
import Purpose from './Purpose';

interface PurposeTreeProps {
	t: Translations;
	purposes: PurposeListType;
	consents: Consents;
	onToggle: (purpose: PurposeType, checked: boolean) => void;
}

const PurposeTree = ({t, purposes, consents, onToggle}: PurposeTreeProps) => (
	<PurposeList>
		{purposes.map((purpose) =>
			'purposes' in purpose ? (
				<PurposeGroup
					t={t}
					id={purpose.id}
					title={purpose.title}
					description={purpose.description}
				>
					<PurposeTree
						t={t}
						purposes={purpose.purposes}
						consents={consents}
						onToggle={onToggle}
					/>
				</PurposeGroup>
			) : (
				<Purpose
					t={t}
					checked={consents[purpose.id] || purpose.isMandatory}
					onToggle={(value) => onToggle(purpose, value)}
					{...(purpose as PurposeType)}
				/>
			)
		)}
	</PurposeList>
);

export default PurposeTree;
