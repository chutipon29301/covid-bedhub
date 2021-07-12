import { patientLogin } from '$lib/api/auth/auth.api';
import { setIsLogin } from '$lib/store';
import { setCookie } from 'nookies';
import type { JwtPayload } from '$lib/models';
import jwt_decode from 'jwt-decode';

export async function loginWithLine(code: string): Promise<boolean> {
	const response = await patientLogin(code);
	setCookie(null, 'access_token', 'Developer reporter-1', {
		path: '/',
		expires: new Date(response.expireDate)
	});
	setIsLogin(true);
	return jwt_decode<JwtPayload>(response.token).hasPatient;
}
