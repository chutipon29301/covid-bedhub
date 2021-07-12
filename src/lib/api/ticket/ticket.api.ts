// import type { JwtTokenInfo } from './auth.model';
import axios from '$lib/services/axios';

export async function getTicket(): Promise<any> {
	const { data } = await axios.get<any>('/ticket');
	return data;
}
