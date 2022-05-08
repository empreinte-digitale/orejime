import React from 'react';
import {Purpose as PurposeType} from '../types';
import {useTranslations} from '../utils/hooks';

export interface PurposeProps extends PurposeType {
	consent: boolean;
	onChange: (checked: boolean) => void;
}

const Purpose = ({
	id,
	title,
	description,
	isMandatory,
	isExempt,
	consent,
	onChange
}: PurposeProps) => {
	const t = useTranslations();
	const domId = `orejime-purpose-${id}`;

	return (
		<div className="orejime-Purpose">
			<input
				id={domId}
				className="orejime-Purpose-input"
				aria-describedby={description ? `${domId}-description` : null}
				disabled={isMandatory}
				checked={!!consent}
				type="checkbox"
				onChange={(event) => {
					onChange(event.target.checked);
				}}
			/>
			<label
				htmlFor={domId}
				className="orejime-Purpose-label"
				{...(isMandatory ? {tabIndex: 0} : {})}
			>
				<span className="orejime-Purpose-title">{title}</span>

				{isMandatory ? (
					<span
						className="orejime-Purpose-mandatory"
						title={t.purpose.mandatoryTitle}
					>
						{t.purpose.mandatory}
					</span>
				) : null}

				{isExempt ? (
					<span
						className="orejime-Purpose-exempt"
						title={t.purpose.exemptTitle}
					>
						{t.purpose.exempt}
					</span>
				) : null}
				<span
					className={`orejime-Purpose-switch ${
						isMandatory ? 'orejime-Purpose-switch--disabled' : ''
					}`}
				>
					<div className="orejime-Purpose-slider"></div>
					<div aria-hidden="true" className="orejime-Purpose-switchLabel">
						{consent ? t.purpose.enabled : t.purpose.disabled}
					</div>
				</span>
			</label>

			{description ? (
				<div
					id={`${domId}-description`}
					className="orejime-Purpose-fullDescription"
				>
					<p
						className="orejime-Purpose-description"
						dangerouslySetInnerHTML={{
							__html: description
						}}
					/>
				</div>
			) : null}
		</div>
	);
};

export default Purpose;
