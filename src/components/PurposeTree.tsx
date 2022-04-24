import React from 'react';
import type {
	PurposeList as PurposeListType,
	Purpose as PurposeType
} from '../types';
import PurposeGroup from './PurposeGroup';
import PurposeList from './PurposeList';
import PurposeContainer from './PurposeContainer';

interface PurposeTreeProps {
	purposes: PurposeListType;
}

const PurposeTree = ({purposes}: PurposeTreeProps) => (
	<PurposeList>
		{purposes.map((purpose) =>
			'purposes' in purpose ? (
				<PurposeGroup
					id={purpose.id}
					title={purpose.title}
					description={purpose.description}
				>
					<PurposeTree purposes={purpose.purposes} />
				</PurposeGroup>
			) : (
				<PurposeContainer {...(purpose as PurposeType)} />
			)
		)}
	</PurposeList>
);

export default PurposeTree;
