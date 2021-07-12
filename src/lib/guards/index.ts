import { PROTECTED_ROUTES, ROUTES } from '$lib/constants/routes';
import { isLogin$ } from '$lib/store';
import type { LoadInput, LoadOutput } from '@sveltejs/kit';

let isLogin = false;
const protectedPath = PROTECTED_ROUTES;
isLogin$.subscribe((authState) => (isLogin = authState));

export async function authGuard({ session, page }: LoadInput): Promise<LoadOutput> {
	const { access_token } = session;
	if (!access_token && !isLogin && protectedPath.includes(page.path)) {
		return { status: 302, redirect: ROUTES.LANDING };
	} else if ((access_token || isLogin) && page.path === ROUTES.LOGIN) {
		return { status: 302, redirect: ROUTES.HOME };
	} else {
		return {};
	}
}

export default {
	authGuard
};
