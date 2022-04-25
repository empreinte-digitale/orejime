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
			const checked = consents[purpose.id];
			const handleToggle = (value: boolean) => onToggle(purpose, value);

			return (
				<li
					key={`purpose-${purpose.id}`}
					className={`orejime-PurposeList-item orejime-PurposeList-item--${purpose.id}`}
				>
					<Purpose
						checked={checked || purpose.isMandatory}
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
