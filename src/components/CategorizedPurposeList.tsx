import React from 'react';
import {Purpose, Category, Consents, Translate} from '../types';
import PurposeList from './PurposeList';

interface Props {
	t: Translate;
	categories: Category[];
	purposes: Purpose[];
	consents: Consents;
	onToggle: (purpose: Purpose, checked: boolean) => void;
}

const pickPurposes = (purposes: Purpose[], names: string[]) =>
	names.map((name) => purposes.find((purpose) => purpose.name === name));

const CategorizedPurposeList = ({
	t,
	categories,
	purposes,
	consents,
	onToggle
}: Props) => (
	<ul className="orejime-CategorizedPurposeList">
		{categories.map(({name, title, description, purposes: purposeNames}) => (
			<li className="orejime-CategorizedPurposeList-item">
				<h2 className="orejime-CategorizedPurposeList-title">
					{t(['categories', name, 'title']) || title}
				</h2>

				<p className="orejime-CategorizedPurposeList-description">
					{t(['categories', name, 'description']) || description}
				</p>

				<div className="orejime-CategorizedPurposeList-purposes">
					<PurposeList
						t={t}
						purposes={pickPurposes(purposes, purposeNames)}
						consents={consents}
						onToggle={onToggle}
					/>
				</div>
			</li>
		))}
	</ul>
);

export default CategorizedPurposeList;
