import React from 'react';
import {Purpose as PurposeType} from '../types';
import {useTranslations} from '../utils/hooks';

interface PurposeProps extends PurposeType {
	checked: boolean;
	onToggle: (checked: boolean) => void;
}

const Purpose = ({
	id,
	title,
	description,
	isMandatory,
	isExempt,
	checked,
	onToggle
}: PurposeProps) => {
	const t = useTranslations();
	const domId = `orejime-purpose-${id}`;
	const isChecked = checked || isMandatory;

	return (
		<div className="orejime-Purpose">
			<input
				id={domId}
				className="orejime-Purpose-input"
				aria-describedby={`${domId}-description`}
				disabled={isMandatory}
				checked={!!isChecked}
				type="checkbox"
				onChange={(event) => {
					onToggle(event.target.checked);
				}}
			/>
			<label
				htmlFor={domId}
				className="orejime-Purpose-label"
				{...(isMandatory ? {tabIndex: 0} : {})}
			>
				<span className="orejime-Purpose-title">
					{t?.[id]?.title || title}
				</span>

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
						{isChecked ? t.purpose.enabled : t.purpose.disabled}
					</div>
				</span>
			</label>
			<div
				id={`${domId}-description`}
				className="orejime-Purpose-fullDescription"
			>
				<p
					className="orejime-Purpose-description"
					dangerouslySetInnerHTML={{
						__html: t?.[id]?.description || description
					}}
				/>
			</div>
		</div>
	);
};

export default Purpose;
