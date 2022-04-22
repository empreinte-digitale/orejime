import React from 'react';
import {Purpose as PurposeType, Consents, Translations} from '../types';
import Purpose from './Purpose';

interface Props {
	t: Translations;
	purposes: PurposeType[];
	consents: Consents;
	onToggle: (purpose: PurposeType, checked: boolean) => void;
}

const PurposeList = ({t, purposes: purposes, consents, onToggle}: Props) => (
	<ul className="orejime-PurposeList">
		{purposes.map((purpose) => {
			const checked = consents[purpose.name];
			const handleToggle = (value: boolean) => onToggle(purpose, value);

			return (
				<li
					key={`purpose-${purpose.name}`}
					className={`orejime-PurposeList-item orejime-PurposeList-item--${purpose.name}`}
				>
					<Purpose
						checked={checked || purpose.required}
						onToggle={handleToggle}
						t={t}
						{...purpose}
					/>
				</li>
			);
		})}
	</ul>
);

export default PurposeList;
