import React, {Component} from 'react';
import ReactModal, {Props as ReactModalProps} from 'react-modal';
import {Config} from '../types';
import {getElement} from '../utils/dom';

interface Props extends Omit<ReactModalProps, 'isOpen'> {
	config: Config;
	isAlert?: boolean;
	handleScrollPosition?: boolean;
}

export default class Dialog extends Component<Props> {
	static defaultProps = {
		handleScrollPosition: true
	};

	private scrollPosition: number;

	constructor(props: Props) {
		super(props);

		if (props.config.appElement) {
			ReactModal.setAppElement(props.config.appElement);
		}
		this.scrollPosition = null;
	}

	componentWillMount() {
		this.scrollPosition = window.pageYOffset;
	}

	componentWillUnmount() {
		if (this.props.handleScrollPosition && this.scrollPosition !== null) {
			// the scroll position stuff is for iOS to work correctly when we want to prevent normal website
			// scrolling with the modal opened
			//
			// /!\ this requires specific CSS to work, example if `htmlOpenClassName = modal-open`:
			//
			// .modal-open {
			//   height: 100%;
			// }
			// .modal-open body {
			//   position: fixed;
			//   overflow: hidden;
			//   height: 100%;
			//   width: 100%;
			// }
			setTimeout(() => {
				//setTimeout because it seems there is a race condition of some sort without it… oh well
				window.scrollTo(window.pageXOffset, this.scrollPosition);
				this.scrollPosition = null;
			}, 0);
		}
	}

	render() {
		const {
			isAlert,
			children,
			handleScrollPosition,
			config,
			...reactModalProps
		} = this.props;

		return (
			<ReactModal
				{...reactModalProps}
				parentSelector={() =>
					getElement(config.orejimeElement, document.body)
				}
				role={isAlert ? 'alertdialog' : 'dialog'}
				htmlOpenClassName="orejimeHtml-WithModalOpen"
				bodyOpenClassName="orejimeBody-WithModalOpen"
				isOpen
			>
				{children}
			</ReactModal>
		);
	}
}
