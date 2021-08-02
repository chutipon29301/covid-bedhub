import type { Gender } from './generated/graphql';

export interface Patient {
	id: string;
	dob: Date;
	firstName: string;
	lastName: string;
	sex: Gender;
	mobile: string;
}

export interface IllnessChecklist {
	NCDs: boolean;
	CARDIOVASCULAR: boolean;
	CKD: boolean;
	STROKE: boolean;
	OBESITY: boolean;
	CANCER: boolean;
	DIABETES: boolean;
}

export interface SymptomChecklist {
	FEVER: boolean;
	COUGH: boolean;
	SMELLESS_RASH: boolean;
	DIARRHEA: boolean;
	TIRED_HEADACHE: boolean;
	DIFFICULT_BREATHING: boolean;
	ANGINA: boolean;
	EXHAUSTED: boolean;
	CHEST_PAIN: boolean;
	UNCONCIOUS: boolean;
}

// export type AccountType = 'reporter' | 'staff' | 'queue_manager' | 'code_generator';

export enum AccountType {
	REPORTER = 'reporter',
	STAFF = 'staff',
	QUEUE = 'queue_manager',
	CODE = 'code_generator'
}

export interface Vaccine {
	name: string;
	dateReceived: Date;
}

export interface DecodedJwt {
	accountType: string;
}

export interface PatientDetail {
	id: number;
	name: string;
	sex: string;
	age: number;
	identification: string;
	mobile: string;
	createdAt: Date;
	examDate: string;
	examLocation: string;
	examReceiveDate: string;
	vaccines: Vaccine[];
	riskLevel: number;
	symptoms: SymptomChecklist;
	illnesses: IllnessChecklist;
	appointmentDate?: string;
}

export interface ErrorDetail {
	heading: string;
	message: string;
	code?: string;
}
