import {
	HEALTHCARE_CODE_ROUTES,
	HEALTHCARE_QUEUE_ROUTES,
	REPORTER_ROUTES,
	HEALTHCARE_STAFF_ROUTES,
	PROTECTED_ROUTES,
	ROUTES
} from '$lib/constants/routes';
import { AccountType } from '$lib/models';
import type { LoadInput, LoadOutput } from '@sveltejs/kit';
import type { DecodedJwt } from '$lib/models';
import jwt_decoder from 'jwt-decode';
import cookie from 'cookie';
import { isJwt } from '$lib/util';

const protectedPath = PROTECTED_ROUTES;

export function authGuard({ session, page }: LoadInput): LoadOutput {
	const access_token = session.access_token || cookie.parse(document.cookie).access_token;
	const loggedIn = access_token;

	if (!loggedIn) return guardUnauthentication(page.path);

	if (!isJwtValid(access_token)) document.cookie = 'access_token=; max-age=0;';

	const accountType = import.meta.env.VITE_DEVELOP
		? access_token.split('-')[0]
		: jwt_decoder<DecodedJwt>(access_token).accountType;

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

function allowedRoutes(path: string, routes: string[]): boolean {
	if (path === '/') return false;
	return !routes.some((r) => `${path}/`.includes(`${r}/`));
}

function isJwtValid(access_token: string): boolean {
	return import.meta.env.VITE_DEVELOP || isJwt(access_token);
}

export default {
	authGuard
};
