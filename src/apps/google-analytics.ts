import {cookies, CookiesParams} from './helpers/google'



export default function(params: CookiesParams) {
	return {
		name: 'google-analytics',
		title : 'Google Analytics',
		purposes : ['analytics'],
		cookies: cookies(params)
	}
}
