type TemplatePart = string | JSX.Element;

interface TemplateVars {
	[name: string]: TemplatePart;
}

// Quick but effective implementation.
// It could break if some part of the string were to be
// exactly equal to a variable name, but this shouldn't
// happen any time soon.
export const template = (
	string: string,
	vars: TemplateVars
): TemplatePart[] => {
	if (typeof string !== 'string') {
		return [];
	}

	return string
		.split(/\{(?!\{)([\w\d]+)\}(?!\})/gi)
		.filter((part) => !!part)
		.map((part) => (part in vars ? vars[part] : part));
};
