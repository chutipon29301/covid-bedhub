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
	const { access_token } = session;
	const loggedIn = access_token || isLogin;

	if (!loggedIn) return guardUnauthentication(page.path);

	const { accountType } = jwt_decoder<DecodedJwt>(
		access_token || cookie.parse(document.cookie).access_token
	);

	return guardAuthentication(accountType, page.path);
}

function guardUnauthentication(path: string) {
	if (protectedPath.includes(path)) {
		return { status: 302, redirect: ROUTES.LANDING };
	}

	return {};
}

function guardAuthentication(accountType: string, path: string) {
	if (accountType === AccountType.CODE && routeCheck(path, HEALTHCARE_CODE_ROUTES))
		return { status: 302, redirect: ROUTES.HEALTHCARE_CODE };
	else if (accountType === AccountType.QUEUE && routeCheck(path, HEALTHCARE_QUEUE_ROUTES))
		return { status: 302, redirect: ROUTES.HEALTHCARE_QUEUE };
	else if (accountType === AccountType.STAFF && routeCheck(path, HEALTHCARE_STAFF_ROUTES))
		return { status: 302, redirect: ROUTES.HEALTHCARE_STAFF };
	else if (accountType === AccountType.REPORTER && routeCheck(path, REPORTER_ROUTES))
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
