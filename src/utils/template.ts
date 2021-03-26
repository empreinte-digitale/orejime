interface TemplateVars {
	[name: string]: any;
}

// Quick but effective implementation.
// It could break if some part of the string were to be
// exactly equal to a variable name, but this shouldn't
// happen any time soon.
export function template(string: string, vars: TemplateVars): any[] {
	if (typeof string !== 'string') {
		return [];
	}

	return string
		.split(/\{(?!\{)([\w\d]+)\}(?!\})/gi)
		.map((part) => (part in vars ? vars[part] : part));
}
