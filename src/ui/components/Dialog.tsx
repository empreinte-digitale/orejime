import React, {useEffect, useLayoutEffect, useState} from 'react';
import ReactModal, {Props as ReactModalProps} from 'react-modal';
import {getElement} from '../utils/dom';
import {useBeforeRender, useConfig} from '../utils/hooks';

interface DialogProps extends Omit<ReactModalProps, 'isOpen'> {
	isAlert?: boolean;
	// the scroll position stuff is for iOS to work correctly
	// when we want to prevent normal website scrolling with
	// the modal opened
	//
	// /!\ this requires specific CSS to work. For example,
	// if `htmlOpenClassName = 'modal-open'`:
	//
	// ```
	// .modal-open {
	//   height: 100%;
	// }
	//
	// .modal-open body {
	//   position: fixed;
	//   overflow: hidden;
	//   height: 100%;
	//   width: 100%;
	// }
	// ```
	handleScrollPosition?: boolean;
	children: any;
}

const Dialog = ({
	isAlert = false,
	handleScrollPosition = true,
	children,
	...reactModalProps
}: DialogProps) => {
	const config = useConfig();
	const [scrollPosition, setScrollPosition] = useState<number | null>(null);

	useBeforeRender(() => {
		if (config?.appElement) {
			ReactModal.setAppElement(config.appElement);
		}
	});

	useLayoutEffect(() => {
		if (scrollPosition === null) {
			setScrollPosition(window.pageYOffset);
		}
	});

	useEffect(() => {
		if (scrollPosition !== null) {
			// setTimeout() avoids a race condition of some sort
			setTimeout(() => {
				if (handleScrollPosition) {
					window.scrollTo(window.pageXOffset, scrollPosition);
				}

				setScrollPosition(null);
			}, 0);
		}
	});

	return (
		<ReactModal
			{...reactModalProps}
			parentSelector={() => getElement(config.orejimeElement, document.body)}
			role={isAlert ? 'alertdialog' : 'dialog'}
			htmlOpenClassName="orejimeHtml-WithModalOpen"
			bodyOpenClassName="orejimeBody-WithModalOpen"
			isOpen
		>
			{children}
		</ReactModal>
	);
};

export default Dialog;
