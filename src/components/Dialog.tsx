import React, {Component} from 'react';
import ReactModal, {Props as ReactModalProps} from 'react-modal';
import {Config} from '../types';
import useLegacyLifecycleMethods from '../utils/useLegacyLifecycleMethods';

interface Props extends ReactModalProps {
	config: Config;
	isOpen: boolean;
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

		// handle lifecycle methods depending on react version for full support
		if (useLegacyLifecycleMethods()) {
			this.componentWillUpdate = this.componentWillUpdateLifecycle;
		} else {
			this.getSnapshotBeforeUpdate = this.getSnapshotBeforeUpdateLifecycle;
		}
	}

	// for react <16.3 support - see constructor
	componentWillUpdateLifecycle(nextProps: Props) {
		const willOpen = nextProps.isOpen;
		if (willOpen && !this.props.isOpen) {
			this.scrollPosition = window.pageYOffset;
		}
	}

	// for react >= 16.3 support - see constructor
	getSnapshotBeforeUpdateLifecycle(prevProps: Props) {
		const {isOpen} = this.props;
		if (isOpen && !prevProps.isOpen) {
			this.scrollPosition = window.pageYOffset;
		}
	}

	componentDidUpdate(prevProps: Props) {
		const {isOpen} = this.props;
		if (
			!isOpen &&
			prevProps.isOpen &&
			this.props.handleScrollPosition &&
			this.scrollPosition !== null
		) {
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
			children,
			handleScrollPosition,
			config,
			...reactModalProps
		} = this.props;

		return (
			<ReactModal
				parentSelector={() =>
					document.getElementById(config.elementID || 'orejime')
				}
				htmlOpenClassName="orejimeHtml-WithModalOpen"
				bodyOpenClassName="orejimeBody-WithModalOpen"
				{...reactModalProps}
			>
				{children}
			</ReactModal>
		);
	}
}
