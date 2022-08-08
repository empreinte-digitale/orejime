import Cookie from 'js-cookie';

export const getCookieNames = () =>
	document.cookie.split(';').reduce((names, cookie) => {
		const [name] = cookie.split('=', 2);
		return name ? names.concat(name.trim()) : names;
	}, [] as string[]);

export const getCookie = (name: string) => Cookie.get(name);

export const setCookie = (
	name: string,
	value = '',
	days = 0,
	domain?: string
) => {
	Cookie.set(name, value, {
		expires: days,
		domain
	});
};

export const deleteCookie = (name: string, path?: string, domain?: string) => {
	if (domain) {
		Cookie.remove(name, {
			path,
			domain
		});

		return;
	}

	// if domain is not defined, try to delete cookie on multiple default domains
	Cookie.remove(name, {
		path,
		domain: location.hostname
	});

	Cookie.remove(name, {
		path,
		domain: location.hostname.split('.').slice(-2).join('.')
	});
};
