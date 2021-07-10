export interface IProfile {
	id: string;
	dob: Date;
	firstName: string;
	lastName: string;
	sex: string;
	address: string;
	subDistrict: string;
	district: string;
	province: string;
	postcode: string;
	mobile: string;
}

export const initProfile: IProfile = {
	id: null,
	dob: null,
	firstName: null,
	lastName: null,
	sex: null,
	address: null,
	subDistrict: null,
	district: null,
	province: null,
	postcode: null,
	mobile: null
};

export interface IVaccineInfo {
	examReceiveDate: Date;
	examLocation: string;
	examDate: Date;
	vaccinesInfo1: {
		vaccine: string;
		date: Date;
	};
	vaccinesInfo2: {
		vaccine: string;
		date: Date;
	};
	vaccinesInfo3: {
		vaccine: string;
		date: Date;
	};
}

export const initVaccineInfo: IVaccineInfo = {
	examReceiveDate: null,
	examLocation: null,
	examDate: null,
	vaccinesInfo1: {
		vaccine: null,
		date: null
	},
	vaccinesInfo2: {
		vaccine: null,
		date: null
	},
	vaccinesInfo3: {
		vaccine: null,
		date: null
	}
};

export interface ISymptoms {
	symptom1: boolean;
	symptom2: boolean;
	symptom3: boolean;
	symptom4: boolean;
	symptom5: boolean;
	symptom6: boolean;
	symptom7: boolean;
	symptom8: boolean;
	symptom9: boolean;
	symptom10: boolean;
}

export const initSymptoms: ISymptoms = {
	symptom1: false,
	symptom2: false,
	symptom3: false,
	symptom4: false,
	symptom5: false,
	symptom6: false,
	symptom7: false,
	symptom8: false,
	symptom9: false,
	symptom10: false
};
