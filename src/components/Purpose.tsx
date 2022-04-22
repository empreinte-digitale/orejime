import React, {ChangeEvent, Component} from 'react';
import {Purpose as PurposeType, Translate} from '../types';

interface Props extends PurposeType {
	t: Translate;
	checked: boolean;
	onToggle: (checked: boolean) => void;
}

export default class Purpose extends Component<Props> {
	render() {
		const {checked, onToggle, name, title, description, t} = this.props;
		const required = this.props.required || false;
		const optOut = this.props.optOut || false;
		const purposes = this.props.purposes || [];
		const onChange = (e: ChangeEvent<HTMLInputElement>) => {
			onToggle(e.target.checked);
		};
		const id = `orejime-purpose-${name}`;
		const isChecked = checked || required;
		const purposesText = purposes
			.map((purpose) => t(['purposes', purpose]))
			.join(', ');
		const optOutText = optOut ? (
			<span
				className="orejime-Purpose-optOut"
				title={t(['purpose', 'optOut', 'description'])}
			>
				{t(['purpose', 'optOut', 'title'])}
			</span>
		) : (
			''
		);
		const requiredText = required ? (
			<span
				className="orejime-Purpose-required"
				title={t(['purpose', 'required', 'description'])}
			>
				{t(['purpose', 'required', 'title'])}
			</span>
		) : (
			''
		);

		const purposesEl =
			purposes.length > 0 ? (
				<p className="orejime-Purpose-purposes">
					{t(['purpose', purposes.length > 1 ? 'purposes' : 'purpose'])}:{' '}
					{purposesText}
				</p>
			) : null;
		const switchLabel = isChecked ? 'enabled' : 'disabled';
		return (
			<div className="orejime-Purpose">
				<input
					id={id}
					className="orejime-Purpose-input"
					aria-describedby={`${id}-description`}
					disabled={required}
					checked={isChecked}
					type="checkbox"
					onChange={onChange}
				/>
				<label
					htmlFor={id}
					className="orejime-Purpose-label"
					{...(required ? {tabIndex: 0} : {})}
				>
					<span className="orejime-Purpose-title">
						{t([name, 'title']) || title}
					</span>
					{requiredText}
					{optOutText}
					<span
						className={`orejime-Purpose-switch ${
							required ? 'orejime-Purpose-switch--disabled' : ''
						}`}
					>
						<div className="orejime-Purpose-slider"></div>
						<div
							aria-hidden="true"
							className="orejime-Purpose-switchLabel"
						>
							{t([switchLabel])}
						</div>
					</span>
				</label>
				<div
					id={`${id}-description`}
					className="orejime-Purpose-fullDescription"
				>
					<p
						className="orejime-Purpose-description"
						dangerouslySetInnerHTML={{
							__html: t([name, 'description']) || description
						}}
					/>
					{purposesEl}
				</div>
			</div>
		);
	}
}
