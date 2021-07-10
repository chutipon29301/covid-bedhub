export const ROUTES = {
	LANDING: '/',
	LOGIN: '/login',
	HOME: '/home',
	HOME_TICKET: '/home/ticket',
	PROFILE: '/profile',
	PROFILE_CHECK: '/profile/check',
	PROFILE_ADD: '/profile/add',
	HEALTHCARE: '/healthcare',
	HEALTHCARE_INVITE: '/healthcare/invite',
	HEALTHCARE_REGISTER: '/healthcare/register',
	HEALTHCARE_CODE: '/healthcare/code',
	HEALTHCARE_QUEUE: '/healthcare/queue',
	HEALTHCARE_STAFF: '/healthcare/staff'
};

export const PROTECTED_ROUTES = [
	ROUTES.HOME,
	ROUTES.HOME_TICKET,
	ROUTES.PROFILE,
	ROUTES.PROFILE_ADD,
	ROUTES.HEALTHCARE_CODE,
	ROUTES.HEALTHCARE_QUEUE,
	ROUTES.HEALTHCARE_STAFF
];
