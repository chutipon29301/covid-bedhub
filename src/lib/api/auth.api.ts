import type { JwtTokenInfo } from './auth.model';
import axios from '$lib/services/axios';

export async function patientLogin(code: string): Promise<JwtTokenInfo> {
	try {
		const { data } = await axios.post<JwtTokenInfo>('/auth/line/token', { code });
		return data;
	} catch (e) {
		console.log(e);
	}
}
