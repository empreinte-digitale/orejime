import React, {ChangeEvent, Component} from 'react';
import {App, Translate} from '../types';

interface Props extends App {
	t: Translate;
	checked: boolean;
	onToggle: (checked: boolean) => void;
}

export default class AppItem extends Component<Props> {
	render() {
		const {checked, onToggle, name, title, description, t} = this.props;
		const required = this.props.required || false;
		const optOut = this.props.optOut || false;
		const purposes = this.props.purposes || [];
		const onChange = (e: ChangeEvent<HTMLInputElement>) => {
			onToggle(e.target.checked);
		};
		const id = `orejime-app-item-${name}`;
		const isChecked = checked || required;
		const purposesText = purposes
			.map((purpose) => t(['purposes', purpose]))
			.join(', ');
		const optOutText = optOut ? (
			<span
				className="orejime-AppItem-optOut"
				title={t(['app', 'optOut', 'description'])}
			>
				{t(['app', 'optOut', 'title'])}
			</span>
		) : (
			''
		);
		const requiredText = required ? (
			<span
				className="orejime-AppItem-required"
				title={t(['app', 'required', 'description'])}
			>
				{t(['app', 'required', 'title'])}
			</span>
		) : (
			''
		);

		const purposesEl =
			purposes.length > 0 ? (
				<p className="orejime-AppItem-purposes">
					{t(['app', purposes.length > 1 ? 'purposes' : 'purpose'])}:{' '}
					{purposesText}
				</p>
			) : null;
		const switchLabel = isChecked ? 'enabled' : 'disabled';
		return (
			<div className="orejime-AppItem">
				<input
					id={id}
					className="orejime-AppItem-input"
					aria-describedby={`${id}-description`}
					disabled={required}
					checked={isChecked}
					type="checkbox"
					onChange={onChange}
				/>
				<label
					htmlFor={id}
					className="orejime-AppItem-label"
					{...(required ? {tabIndex: 0} : {})}
				>
					<span className="orejime-AppItem-title">
						{t([name, 'title']) || title}
					</span>
					{requiredText}
					{optOutText}
					<span
						className={`orejime-AppItem-switch ${
							required ? 'orejime-AppItem-switch--disabled' : ''
						}`}
					>
						<div className="orejime-AppItem-slider"></div>
						<div
							aria-hidden="true"
							className="orejime-AppItem-switchLabel"
						>
							{t([switchLabel])}
						</div>
					</span>
				</label>
				<div
					id={`${id}-description`}
					className="orejime-AppItem-fullDescription"
				>
					<p
						className="orejime-AppItem-description"
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
