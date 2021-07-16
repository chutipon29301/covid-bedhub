export const ROUTES = {
	LANDING: '/',
	LOGIN: '/login',
	HOME: '/home',
	HOME_TICKET: '/home/ticket',
	PATIENT: '/patient',
	PATIENT_CHECK: '/patient/check',
	PATIENT_ADD: '/patient/add',
	TICKET: '/ticket',
	TICKET_ILLNESSES: '/ticket/illnesses',
	TICKET_SYMPTOM: '/ticket/symptom',
	TICKET_ADD: '/ticket/add',
	TICKET_VACCINE: '/ticket/vaccine',
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
	ROUTES.PATIENT,
	ROUTES.PATIENT_CHECK,
	ROUTES.PATIENT_ADD,
	ROUTES.TICKET,
	ROUTES.TICKET_ILLNESSES,
	ROUTES.TICKET_SYMPTOM,
	ROUTES.TICKET_ADD,
	ROUTES.TICKET_VACCINE,
	ROUTES.HEALTHCARE_CODE,
	ROUTES.HEALTHCARE_QUEUE,
	ROUTES.HEALTHCARE_STAFF
];
