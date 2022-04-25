import React from 'react';
import {Purpose, Category, Consents, Translations} from '../types';
import PurposeList from './PurposeList';

interface Props {
	t: Translations;
	categories: Category[];
	purposes: Purpose[];
	consents: Consents;
	onToggle: (purpose: Purpose, checked: boolean) => void;
}

const pickPurposes = (purposes: Purpose[], ids: string[]) =>
	ids.map((id) => purposes.find((purpose) => purpose.id === id));

const CategorizedPurposeList = ({
	t,
	categories,
	purposes,
	consents,
	onToggle
}: Props) => (
	<ul className="orejime-CategorizedPurposeList">
		{categories.map(({id, title, description, purposes: purposeIds}) => (
			<li className="orejime-CategorizedPurposeList-item">
				<h2 className="orejime-CategorizedPurposeList-title">
					{t?.categories?.[id]?.title || title}
				</h2>

				<p className="orejime-CategorizedPurposeList-description">
					{t?.categories?.[id]?.description || description}
				</p>

				<div className="orejime-CategorizedPurposeList-purposes">
					<PurposeList
						t={t}
						purposes={pickPurposes(purposes, purposeIds)}
						consents={consents}
						onToggle={onToggle}
					/>
				</div>
			</li>
		))}
	</ul>
);

export default CategorizedPurposeList;
