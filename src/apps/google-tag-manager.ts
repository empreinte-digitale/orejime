import {cookies, CookiesParams} from './helpers/google'



export default function(params: CookiesParams) {
	return {
		name: 'google-tag-manager',
		title : 'Google Tag Manager',
		purposes : ['analytics'],
		cookies: cookies(params)
	}
}
