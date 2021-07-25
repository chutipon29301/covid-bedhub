import type { Vaccine } from '$lib/models';

export interface VaccineInfo {
	examReceiveDate: Date;
	examLocation: string;
	examDate: Date;
	vaccines: Vaccine[];
}

export interface Symptoms {
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

export interface Illnesses {
	illness1: boolean;
	illness2: boolean;
	illness3: boolean;
	illness4: boolean;
	illness5: boolean;
	illness6: boolean;
	illness7: boolean;
}
