const backupName = (attribute: string) => `orejime-${attribute}`;

const backupAttribute = <T extends HTMLElement>(element: T, name: string) => {
	if (element.getAttribute(name) && !element.dataset?.[name]) {
		element.dataset[name] = element.getAttribute(name);
		element.removeAttribute(name);
	}
};

const restoreAttribute = (element: HTMLElement, name: string) => {
	if (element.dataset?.[name]) {
		element.setAttribute(name, element.dataset[name]);
		delete element.dataset[name];
	}
};

const updateScriptElement = (element: HTMLScriptElement, consent: boolean) => {
	if (!consent) {
		backupAttribute(element, 'type');
		backupAttribute(element, 'src');
		element.type = 'opt-in';
		return;
	}

	// we create a new script instead of updating the node in
	// place, as the script won't start correctly otherwise
	const clone = element.cloneNode(true) as typeof element;
	restoreAttribute(clone, 'type');
	restoreAttribute(clone, 'src');

	const parent = element.parentElement;
	parent?.insertBefore(clone, element);
	parent?.removeChild(element);
};

const updateDomElement = (element: HTMLElement, consent: boolean) => {
	const {dataset} = element;
	const attrs = ['href', 'src'];
	const backupDisplay = backupName('display');

	if (consent) {
		for (const attr of attrs) {
			const attrValue = dataset[attr];

			if (attrValue === undefined) {
				continue;
			}

			if (dataset[backupName(attr)] === undefined) {
				dataset[backupName(attr)] = element.getAttribute(attr);
			}

			element.setAttribute(attr, attrValue);
		}

		if (dataset?.title?.length) {
			element.title = dataset.title;
		}

		if (dataset?.[backupDisplay]?.length) {
			element.style.display = dataset[backupDisplay] as string;
		}
	} else {
		element.removeAttribute('title');

		if (dataset.hide === 'true') {
			if (backupDisplay in dataset) {
				dataset[backupDisplay] = element.style.display;
			}

			element.style.display = 'none';
		}

		for (const attr of attrs) {
			const attrValue = dataset[attr];

			if (attrValue === undefined) {
				continue;
			}

			if (backupName(attr) in dataset) {
				element.setAttribute(attr, dataset[backupName(attr)]);
			}
		}
	}
};

const updateAppElement = (element: HTMLElement, consent: boolean) => {
	switch (element.tagName) {
		case 'SCRIPT':
			//case 'LINK':
			return updateScriptElement(element as HTMLScriptElement, consent);

		default:
			return updateDomElement(element, consent);
	}
};

export default (id: string, consent: boolean) => {
	document
		// TODO namespace orejime-x
		.querySelectorAll<HTMLElement>(`[data-purpose="${id}"]`)
		.forEach((element) => {
			updateAppElement(element, consent);
		});
};
