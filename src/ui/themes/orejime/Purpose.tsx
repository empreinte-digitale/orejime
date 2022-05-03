import React, {useEffect, useRef} from 'react';
import {useTranslations} from '../../utils/hooks';
import {ConsentState} from '../../components/types/ConsentState';
import {PurposeComponent} from '../../components/types/Purpose';

const Purpose: PurposeComponent = ({
	id,
	title,
	description,
	isMandatory,
	isExempt,
	consent,
	children,
	onChange
}) => {
	const t = useTranslations();
	const domId = `orejime-purpose-${id}`;
	const inputRef = useRef<HTMLInputElement>();

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.indeterminate = consent === ConsentState.partial;
		}
	}, [consent]);

	return (
		<div className="orejime-Purpose">
			<input
				id={domId}
				ref={inputRef}
				className="orejime-Purpose-input"
				aria-describedby={description ? `${domId}-description` : null}
				disabled={isMandatory}
				checked={consent === ConsentState.accepted}
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
						{consent === ConsentState.accepted
							? t.purpose.enabled
							: consent === ConsentState.declined
							? t.purpose.disabled
							: t.purpose.partial}
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

			<div className="orejime-Purpose-children">{children}</div>
		</div>
	);
};

export default Purpose;
