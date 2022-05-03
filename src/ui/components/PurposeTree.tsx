import React from 'react';
import type {PurposeList as PurposeListType} from '../types';
import PurposeGroupContainer from './PurposeGroupContainer';
import PurposeList from '../themes/orejime/PurposeList';
import PurposeContainer from './PurposeContainer';

interface PurposeTreeProps {
	purposes: PurposeListType;
}

const PurposeTree = ({purposes}: PurposeTreeProps) => (
	<PurposeList>
		{purposes.map((purpose) =>
			'purposes' in purpose ? (
				<PurposeGroupContainer {...purpose}>
					<PurposeTree purposes={purpose.purposes} />
				</PurposeGroupContainer>
			) : (
				<PurposeContainer {...purpose} />
			)
		)}
	</PurposeList>
);

export default PurposeTree;
