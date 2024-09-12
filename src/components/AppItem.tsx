import React, {ChangeEvent, Component} from 'react';
import {App, CssNamespace, Translate} from '../types';

interface Props extends App {
	t: Translate;
	ns: CssNamespace;
	checked: boolean;
	onToggle: (checked: boolean) => void;
}

export default class AppItem extends Component<Props> {
	render() {
		const {checked, onToggle, name, title, description, t, ns} = this.props;
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
				className={ns('AppItem-optOut')}
				title={t(['app', 'optOut', 'description'])}
			>
				{t(['app', 'optOut', 'title'])}
			</span>
		) : (
			''
		);
		const requiredText = required ? (
			<span
				className={ns('AppItem-required')}
				title={t(['app', 'required', 'description'])}
			>
				{t(['app', 'required', 'title'])}
			</span>
		) : (
			''
		);

		const purposesEl =
			purposes.length > 0 ? (
				<p className={ns('AppItem-purposes')}>
					{t(['app', purposes.length > 1 ? 'purposes' : 'purpose'])}:{' '}
					{purposesText}
				</p>
			) : null;
		const switchLabel = isChecked ? 'enabled' : 'disabled';
		return (
			<div className={ns('AppItem')}>
				<input
					id={id}
					className={ns('AppItem-input')}
					aria-describedby={`${id}-description`}
					disabled={required}
					checked={isChecked}
					type="checkbox"
					onChange={onChange}
				/>
				<label
					htmlFor={id}
					className={ns('AppItem-label')}
					{...(required ? {tabIndex: 0} : {})}
				>
					<span className={ns('AppItem-title')}>
						{t([name, 'title']) || title}
					</span>
					{requiredText}
					{optOutText}
					<span
						className={ns(
							`AppItem-switch ${
								required ? 'AppItem-switch--disabled' : ''
							}`
						)}
					>
						<div className={ns('AppItem-slider')}></div>
						<div aria-hidden="true" className={ns('AppItem-switchLabel')}>
							{t([switchLabel])}
						</div>
					</span>
				</label>
				<div
					id={`${id}-description`}
					className={ns('AppItem-fullDescription')}
				>
					<p
						className={ns('AppItem-description')}
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
