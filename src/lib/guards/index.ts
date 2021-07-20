import {
	HEALTHCARE_CODE_ROUTES,
	HEALTHCARE_QUEUE_ROUTES,
	REPORTER_ROUTES,
	HEALTHCARE_STAFF_ROUTES,
	PROTECTED_ROUTES,
	ROUTES
} from '$lib/constants/routes';
import { isLogin$ } from '$lib/store';
import type { LoadInput, LoadOutput } from '@sveltejs/kit';
import { AccountType } from '$lib/models';
import type { DecodedJwt } from '$lib/models';
import jwt_decoder from 'jwt-decode';
import cookie from 'cookie';

let isLogin = false;
const protectedPath = PROTECTED_ROUTES;
isLogin$.subscribe((authState) => (isLogin = authState));

export async function authGuard({ session, page }: LoadInput): Promise<LoadOutput> {
	// if (import.meta.env.VITE_DEVELOP) return {};

	const { access_token } = session;
	const loggedIn = access_token || isLogin;

	if (!loggedIn && protectedPath.includes(page.path)) {
		return { status: 302, redirect: ROUTES.LANDING };
	}

	if (!loggedIn) return {};

	const { accountType } = jwt_decoder<DecodedJwt>(
		access_token || cookie.parse(document.cookie).access_token
	);

	if (accountType === AccountType.CODE && routeCheck(page.path, HEALTHCARE_CODE_ROUTES))
		return { status: 302, redirect: ROUTES.HEALTHCARE_CODE };
	else if (accountType === AccountType.QUEUE && routeCheck(page.path, HEALTHCARE_QUEUE_ROUTES))
		return { status: 302, redirect: ROUTES.HEALTHCARE_QUEUE };
	else if (accountType === AccountType.STAFF && routeCheck(page.path, HEALTHCARE_STAFF_ROUTES))
		return { status: 302, redirect: ROUTES.HEALTHCARE_STAFF };
	else if (accountType === AccountType.REPORTER && routeCheck(page.path, REPORTER_ROUTES))
		return { status: 302, redirect: ROUTES.HOME };

	return {};
}

function routeCheck(path: string, routes: string[]) {
	if (path === '/') return false;
	return !routes.some((r) => path.includes(r));
}

export default {
	authGuard
};
