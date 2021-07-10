import { patientLogin } from '$lib/api/auth.api';
import { setIsLogin } from '$lib/store';
import { setCookie } from 'nookies';
// import jwt_decode from 'jwt-decode';

export async function loginWithLine(code: string): Promise<void> {
	const response = await patientLogin(code);
	setCookie(null, 'access_token', response.token, {
		maxAge: 60 * 60 * 24 * 7,
		path: '/'
	});
	// console.log('*****', jwt_decode(response.token));
	setIsLogin(true);
}
