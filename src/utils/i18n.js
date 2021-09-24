function format(string, ...args) {
	var t = typeof args[0];
	var values;
	if (args.length == 0) values = {};
	else values = 'string' === t || 'number' === t ? args : args[0];

	var splits = [];

	var s = string;
	while (s.length > 0) {
		var m = s.match(/\{(?!\{)([\w\d]+)\}(?!\})/);
		if (m !== null) {
			var left = s.substr(0, m.index);
			var sep = s.substr(m.index, m[0].length);
			s = s.substr(m.index + m[0].length);
			var n = parseInt(m[1]);
			splits.push(left);
			if (n != n) {
				// not a number
				splits.push(values[m[1]]);
			} else {
				// a numbered argument
				splits.push(values[n]);
			}
		} else {
			splits.push(s);
			s = '';
		}
	}
	return splits;
}

export function language() {
	return window.language || document.documentElement.lang || 'en';
}

function hget(d, key, defaultValue) {
	var kl = key;
	if (!Array.isArray(kl)) kl = [kl];
	var cv = d;
	for (var i = 0; i < kl.length; i++) {
		if (cv === undefined) return defaultValue;
		if (cv instanceof Map) cv = cv.get(kl[i]);
		else cv = cv[kl[i]];
	}
	if (cv === undefined) return defaultValue;
	return cv;
}

export function t(trans, lang, debug, key) {
	var kl = key;
	if (!Array.isArray(kl)) kl = [kl];
	const value = hget(trans, [lang, ...kl]);
	if (value === undefined) {
		if (debug) {
			console.log(
				format('[missing translation: {lang}/{key}]', {
					key: kl.join('/'),
					lang: lang
				}).join('')
			);
		}
		return false;
	}
	const params = Array.prototype.slice.call(arguments, 4);
	if (params.length > 0) return format(value, ...params);
	return value;
}
