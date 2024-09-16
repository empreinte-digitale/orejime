import React, {
	useEffect,
	useId,
	useLayoutEffect,
	useState
} from 'react';
import MicroModal from 'micromodal';

interface DialogProps {
	isAlert?: boolean;
	label?: string;
	labelId?: string;
	className?: string;
	portalClassName?: string;
	overlayClassName?: string;
	htmlClassName?: string;
	// the scroll position stuff is for iOS to work correctly
	// when we want to prevent normal website scrolling with
	// the modal opened
	//
	// /!\ this requires specific CSS to work. For example,
	// if `htmlClassName = 'modal-open'`:
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
	onRequestClose?: () => void;
	children: any;
}

const Dialog = ({
	isAlert = false,
	label,
	labelId,
	className,
	portalClassName,
	overlayClassName,
	htmlClassName,
	handleScrollPosition = true,
	onRequestClose,
	children
}: DialogProps) => {
	const id = useId();
	const [scrollPosition, setScrollPosition] = useState<number | null>(null);

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

	useEffect(() => {
		if (htmlClassName) {
			document.documentElement.classList.add(htmlClassName);
		}

		MicroModal.show(id, {
			onClose: onRequestClose
		});

		return () => {
			MicroModal.close(id);

			if (htmlClassName) {
				document.documentElement.classList.remove(htmlClassName);
			}
		};
	}, []);

	return (
		<div className={portalClassName} id={id} aria-hidden="true">
			<div
				className={overlayClassName}
				tabIndex={-1}
				data-micromodal-close={isAlert ? null : true}
			>
				<div
					className={className}
					role={isAlert ? 'alertdialog' : 'dialog'}
					aria-modal="true"
					aria-label={label}
					aria-labelledby={labelId}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Dialog;
