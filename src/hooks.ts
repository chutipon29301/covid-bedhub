import cookie from 'cookie';
import type { GetSession } from '@sveltejs/kit';

export const getSession: GetSession = (request) => {
	return {
		access_token: cookie.parse(request.headers.cookie || '').access_token,
		init_path: request.path
	};
};
