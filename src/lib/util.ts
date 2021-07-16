import type { JwtPayload } from '$lib/models';
import cookie from 'cookie';
import jwt_decode from 'jwt-decode';

export function storeToken(token: string, expires: Date): JwtPayload {
	document.cookie = cookie.serialize('access_token', token, {
		path: '/',
		expires: new Date(expires)
	});
	return jwt_decode<JwtPayload>(token);
}
