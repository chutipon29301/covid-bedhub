import cookie from 'cookie';
import { CreateVaccine, Illness, Symptom, VaccineName } from './generated/graphql';
import type { IllnessChecklist, SymptomChecklist, Vaccine } from './models';

export function storeToken(token: string, expires: Date): void {
	document.cookie = cookie.serialize(
		'access_token',
		import.meta.env.VITE_DEVELOP ? 'Developer reporter-1' : `Bearer ${token}`,
		{
			path: '/',
			expires: new Date(expires)
		}
	);
}

export function dateToStringFormat(date: Date): string {
	const d = new Date(date);
	return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function illnessToChecklist(illnesses: Illness[]): IllnessChecklist {
	return {
		NCDs: illnesses?.some((i) => i === 'NCDs'),
		CARDIOVASCULAR: illnesses?.some((i) => i === 'CARDIOVASCULAR'),
		CKD: illnesses?.some((i) => i === 'CKD'),
		STROKE: illnesses?.some((i) => i === 'STROKE'),
		OBESITY: illnesses?.some((i) => i === 'OBESITY'),
		CANCER: illnesses?.some((i) => i === 'CANCER'),
		DIABETES: illnesses?.some((i) => i === 'DIABETES')
	};
}

export function symptomToChecklist(symptoms: Symptom[]): SymptomChecklist {
	return {
		FEVER: symptoms?.some((i) => i === 'FEVER'),
		COUGH: symptoms?.some((i) => i === 'COUGH'),
		SMELLESS_RASH: symptoms?.some((i) => i === 'SMELLESS_RASH'),
		DIARRHEA: symptoms?.some((i) => i === 'DIARRHEA'),
		TIRED_HEADACHE: symptoms?.some((i) => i === 'TIRED_HEADACHE'),
		DIFFICULT_BREATHING: symptoms?.some((i) => i === 'DIFFICULT_BREATHING'),
		ANGINA: symptoms?.some((i) => i === 'ANGINA'),
		EXHAUSTED: symptoms?.some((i) => i === 'EXHAUSTED'),
		CHEST_PAIN: symptoms?.some((i) => i === 'CHEST_PAIN'),
		UNCONCIOUS: symptoms?.some((i) => i === 'UNCONCIOUS')
	};
}

export function checklistToEnum<T>(checklist: SymptomChecklist | IllnessChecklist): T[] {
	if (!checklist) return [];
	return Object.entries(checklist)
		.map(([k, v]) => (v ? <T>(<unknown>k) : null))
		.filter((k) => k);
}

export function vaccinePopulate(vaccines: Vaccine[]): CreateVaccine[] {
	return vaccines
		.map((v, i) =>
			v.name
				? {
						vaccineReceiveDate: dateToStringFormat(v.dateReceived),
						doseNumber: i + 1,
						vaccineName: VaccineName[v.name]
				  }
				: null
		)
		.filter((v) => v);
}
