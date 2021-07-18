export interface Patient {
	id: string;
	dob: Date;
	firstName: string;
	lastName: string;
	sex: string;
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

export type AccountType = 'reporter' | 'staff' | 'queue_manager' | 'code_generator';

export interface GPSLocation {
	lat: number;
	lng: number;
}

export interface Vaccine {
	name: string;
	dateReceived: Date;
}
