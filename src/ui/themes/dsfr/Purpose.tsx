import React, {FC, useState} from 'react';
import type {CSSProperties} from 'react';
import {ConsentState} from '../../components/types/ConsentState';
import type {PurposeProps} from '../../components/types/Purpose';
import {useTranslations} from '../../utils/hooks';

interface DsfrPurposeProps extends PurposeProps {
	isGlobal: boolean;
}

type DsfrPurposeComponent = FC<DsfrPurposeProps>;

const Purpose: DsfrPurposeComponent = ({
	id,
	title,
	description,
	isGlobal = false,
	isMandatory = false,
	isExempt = false,
	consent,
	children,
	onChange
}) => {
	const t = useTranslations();
	const [isExpanded, setExpanded] = useState(false);
	const domId = `orejime-purpose-${id}`;

	return (
		<div
			className={
				isGlobal
					? 'fr-consent-service fr-consent-manager__header'
					: 'fr-consent-service'
			}
		>
			<fieldset
				className="fr-fieldset fr-fieldset--inline"
				role={description ? 'group' : null}
				aria-labelledby={
					description ? `${domId}-legend ${domId}-description` : null
				}
			>
				<legend
					id={`${domId}-legend`}
					className="fr-consent-service__title"
				>
					{title}

					{isMandatory ? (
						<>
							{' '}
							<span title={t.purpose.mandatoryTitle}>
								{t.purpose.mandatory}
							</span>
						</>
					) : null}

					{isExempt ? (
						<>
							{' '}
							<span title={t.purpose.exemptTitle}>
								{t.purpose.exempt}
							</span>
						</>
					) : null}
				</legend>

				<div className="fr-consent-service__radios fr-fieldset--inline">
					<div className="fr-radio-group">
						<input
							type="radio"
							id={`${domId}-accept`}
							name={id}
							checked={consent === ConsentState.accepted}
							onChange={onChange.bind(null, true)}
						/>

						<label className="fr-label" htmlFor={`${domId}-accept`}>
							{isGlobal ? t.modal.acceptAll : t.purpose.accept}
						</label>
					</div>

					<div className="fr-radio-group">
						<input
							type="radio"
							id={`${domId}-decline`}
							name={id}
							disabled={isMandatory}
							checked={consent === ConsentState.declined}
							onChange={onChange.bind(null, false)}
						/>

						<label className="fr-label" htmlFor={`${domId}-decline`}>
							{isGlobal ? t.modal.declineAll : t.purpose.decline}
						</label>
					</div>
				</div>

				{description ? (
					<p
						id={`${domId}-description`}
						className="fr-consent-service__desc"
						dangerouslySetInnerHTML={{
							__html: description
						}}
					></p>
				) : null}

				{children ? (
					<>
						<div className="fr-consent-service__collapse">
							<button
								className="fr-consent-service__collapse-btn"
								aria-expanded={isExpanded}
								aria-describedby={`${id}-legend`}
								aria-controls={`${id}-collapse`}
								onClick={() => {
									setExpanded(!isExpanded);
								}}
							>
								{t.purpose.showMore}
							</button>
						</div>

						<div
							id={`${domId}-legend`}
							className={
								isExpanded
									? 'fr-consent-services fr-collapse fr-collapse--expanded'
									: 'fr-consent-services fr-collapse'
							}
							style={
								{
									maxHeight: isExpanded ? 'none' : 0,
									'--collapse': 0
								} as CSSProperties
							}
						>
							{children}
						</div>
					</>
				) : null}
			</fieldset>
		</div>
	);
};

export default Purpose;
