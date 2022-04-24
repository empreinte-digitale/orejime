import React, {ChangeEvent, Component} from 'react';
import {Purpose as PurposeType, Translations} from '../types';

interface PurposeProps extends PurposeType {
	t: Translations;
	checked: boolean;
	onToggle: (checked: boolean) => void;
}

export default class Purpose extends Component<PurposeProps> {
	render() {
		const {checked, onToggle, id, title, description, t} = this.props;
		const mandatory = this.props.isMandatory || false;
		const exempt = this.props.isExempt || false;
		const onChange = (e: ChangeEvent<HTMLInputElement>) => {
			onToggle(e.target.checked);
		};
		const domId = `orejime-purpose-${id}`;
		const isChecked = checked || mandatory;
		const exemptText = exempt ? (
			<span className="orejime-Purpose-exempt" title={t.purpose.exemptTitle}>
				{t.purpose.exempt}
			</span>
		) : (
			''
		);
		const requiredText = mandatory ? (
			<span
				className="orejime-Purpose-mandatory"
				title={t.purpose.mandatoryTitle}
			>
				{t.purpose.mandatory}
			</span>
		) : (
			''
		);

		return (
			<div className="orejime-Purpose">
				<input
					id={domId}
					className="orejime-Purpose-input"
					aria-describedby={`${domId}-description`}
					disabled={mandatory}
					checked={isChecked}
					type="checkbox"
					onChange={onChange}
				/>
				<label
					htmlFor={domId}
					className="orejime-Purpose-label"
					{...(mandatory ? {tabIndex: 0} : {})}
				>
					<span className="orejime-Purpose-title">
						{t?.[id]?.title || title}
					</span>
					{requiredText}
					{exemptText}
					<span
						className={`orejime-Purpose-switch ${
							mandatory ? 'orejime-Purpose-switch--disabled' : ''
						}`}
					>
						<div className="orejime-Purpose-slider"></div>
						<div
							aria-hidden="true"
							className="orejime-Purpose-switchLabel"
						>
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
	}
}
