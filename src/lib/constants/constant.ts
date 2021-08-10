export const TICKET_STATUS = {
	REQUEST: 'REQUEST',
	MATCH: 'MATCH',
	HOSPITAL_CANCEL: 'HOSPITAL_CANCEL',
	PATIENT_CANCEL: 'PATIENT_CANCEL',
	EXPIRED: 'EXPIRED'
};

export const TICKET_STATUS_LABEL = {
	REQUEST: 'requeted_status',
	MATCH: 'matched_status',
	HOSPITAL_CANCEL: 'cancelled_status',
	PATIENT_CANCEL: 'cancelled_status',
	EXPIRED: 'expired_status'
};

export const ILLNESSES_LABEL = {
	NCDs: 'illness1_label',
	CARDIOVASCULAR: 'illness2_label',
	CKD: 'illness3_label',
	STROKE: 'illness4_label',
	OBESITY: 'illness5_label',
	CANCER: 'illness6_label',
	DIABETES: 'illness7_label'
};

export const SYMSPTOMS_LABEL = {
	FEVER: 'symptom1_label',
	COUGH: 'symptom2_label',
	SMELLESS_RASH: 'symptom3_label',
	DIARRHEA: 'symptom4_label',
	TIRED_HEADACHE: 'symptom5_label',
	DIFFICULT_BREATHING: 'symptom6_label',
	ANGINA: 'symptom7_label',
	EXHAUSTED: 'symptom8_label',
	CHEST_PAIN: 'symptom9_label',
	UNCONCIOUS: 'symptom10_label'
};

export const GENDER_LABEL = {
	MALE: 'male_label',
	FEMALE: 'female_label'
};

export const RISK_LEVEL_LABEL = {
	1: 'low_label',
	2: 'normal_label',
	3: 'high_label',
	4: 'very_high_label'
};

export const USER_TYPE = {
	QUEUE_MANAGER: 'Queue Manager',
	STAFF: 'Staff'
};
