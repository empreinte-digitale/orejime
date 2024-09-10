import React from 'react';
import type {PurposeList as PurposeListType} from '../types';
import PurposeGroupContainer from './PurposeGroupContainer';
import PurposeContainer from './PurposeContainer';
import {useTheme} from '../utils/hooks';

interface PurposeTreeProps {
	purposes: PurposeListType;
}

const PurposeTree = ({purposes}: PurposeTreeProps) => {
	const {PurposeList} = useTheme();

	return (
		<PurposeList>
			{purposes.map((purpose) =>
				'purposes' in purpose ? (
					<PurposeGroupContainer key={purpose.id} {...purpose}>
						<PurposeTree purposes={purpose.purposes} />
					</PurposeGroupContainer>
				) : (
					<PurposeContainer key={purpose.id} {...purpose} />
				)
			)}
		</PurposeList>
	);
};

export default PurposeTree;
