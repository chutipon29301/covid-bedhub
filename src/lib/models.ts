export interface Patient {
	id: string;
	dob: Date;
	firstName: string;
	lastName: string;
	sex: string;
	address: string;
	subDistrict: string;
	district: string;
	province: string;
	zipcode: string;
	mobile: string;
	illnesses: Illness;
}

export const initPatient: Patient = {
	id: null,
	dob: null,
	firstName: null,
	lastName: null,
	sex: null,
	address: null,
	subDistrict: null,
	district: null,
	province: null,
	zipcode: null,
	mobile: null,
	illnesses: null
};

export enum Illness {
	NCDs = 'NCDs', // โรคทางเดินหายใจเรื้อรัง
	CARDIOVASCULAR = 'CARDIOVASCULAR', // โรคหัวใจและหลอดเลือด
	CKD = 'CKD', // โรคไตวายเรื้อรัง
	STROKE = 'STROKE', //โรคหลอดเลือดสมอง
	OBESITY = 'OBESITY', //โรคอ้วน
	CANCER = 'CANCER', //โรคมะเร็ง
	DIABETES = 'DIABETES' //โรคเบาหวาน
}

export type AccountType = 'reporter' | 'staff' | 'queue_manager' | 'code_generator';

export interface JwtPayload {
	id: number;
	accountType: AccountType;
	hasPatient?: boolean;
}
