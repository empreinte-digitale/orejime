import React from 'react';
import type {
	PurposeList as PurposeListType,
	Purpose as PurposeType,
	Consents
} from '../types';
import PurposeGroup from './PurposeGroup';
import PurposeList from './PurposeList';
import Purpose from './Purpose';

interface PurposeTreeProps {
	purposes: PurposeListType;
	consents: Consents;
	onToggle: (purpose: PurposeType, checked: boolean) => void;
}

const PurposeTree = ({purposes, consents, onToggle}: PurposeTreeProps) => (
	<PurposeList>
		{purposes.map((purpose) =>
			'purposes' in purpose ? (
				<PurposeGroup
					id={purpose.id}
					title={purpose.title}
					description={purpose.description}
				>
					<PurposeTree
						purposes={purpose.purposes}
						consents={consents}
						onToggle={onToggle}
					/>
				</PurposeGroup>
			) : (
				<Purpose
					checked={consents[purpose.id] || purpose.isMandatory}
					onToggle={(value) => onToggle(purpose, value)}
					{...(purpose as PurposeType)}
				/>
			)
		)}
	</PurposeList>
);

export default PurposeTree;
