import {
	HEALTHCARE_CODE_ROUTES,
	HEALTHCARE_QUEUE_ROUTES,
	REPORTER_ROUTES,
	HEALTHCARE_STAFF_ROUTES,
	PROTECTED_ROUTES,
	ROUTES
} from '$lib/constants/routes';
import { accessToken$, isLogin$ } from '$lib/store';
import { AccountType } from '$lib/models';
import type { LoadInput, LoadOutput } from '@sveltejs/kit';
import type { DecodedJwt } from '$lib/models';
import jwt_decoder from 'jwt-decode';
import cookie from 'cookie';

let isLogin = false;
let accessToken = '';
const protectedPath = PROTECTED_ROUTES;
const loginUnsub = isLogin$.subscribe((authState) => {
	isLogin = authState;
	if (authState) loginUnsub();
});
const tokenUnsub = accessToken$.subscribe((token) => {
	accessToken = token;
	if (token) tokenUnsub();
});

export async function authGuard({ session, page }: LoadInput): Promise<LoadOutput> {
	const access_token = session.access_token || accessToken;
	const loggedIn = access_token || isLogin;

	if (!loggedIn) return guardUnauthentication(page.path);

	const accountType = import.meta.env.VITE_DEVELOP
		? access_token.split('-')[0]
		: jwt_decoder<DecodedJwt>(access_token || cookie.parse(document.cookie).access_token)
				.accountType;

	return guardAuthentication(accountType, page.path);
}

function guardUnauthentication(path: string) {
	if (protectedPath.includes(path)) {
		return { status: 302, redirect: ROUTES.LANDING };
	}

	return {};
}

function guardAuthentication(accountType: string, path: string) {
	if (accountType === AccountType.CODE && allowedRoutes(path, HEALTHCARE_CODE_ROUTES))
		return { status: 302, redirect: ROUTES.HEALTHCARE_CODE };
	if (accountType === AccountType.QUEUE && allowedRoutes(path, HEALTHCARE_QUEUE_ROUTES))
		return { status: 302, redirect: ROUTES.HEALTHCARE_QUEUE };
	if (accountType === AccountType.STAFF && allowedRoutes(path, HEALTHCARE_STAFF_ROUTES))
		return { status: 302, redirect: ROUTES.HEALTHCARE_STAFF };
	if (accountType === AccountType.REPORTER && allowedRoutes(path, REPORTER_ROUTES))
		return { status: 302, redirect: ROUTES.HOME };
	return {};
}

function allowedRoutes(path: string, routes: string[]) {
	if (path === '/') return false;
	return !routes.some((r) => path.includes(r));
}

export default {
	authGuard
};
