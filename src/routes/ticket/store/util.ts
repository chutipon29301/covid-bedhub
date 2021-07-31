import type { IllnessChecklist, Patient, SymptomChecklist, Vaccine } from '$lib/models';
import type { VaccineInfo } from './models';
import {
	form$,
	illnesses$,
	patientId$,
	setForm,
	setIllnesses,
	setPatientId,
	setSymptoms,
	setVaccine,
	symptoms$,
	vaccine$
} from './store';

export function saveProfileToStorage() {
	let id: string,
		illnesses: IllnessChecklist,
		symptoms: SymptomChecklist,
		form: Patient,
		vaccine: VaccineInfo;
	patientId$.subscribe((v) => (id = v))();
	illnesses$.subscribe((v) => (illnesses = v))();
	symptoms$.subscribe((v) => (symptoms = v))();
	form$.subscribe((v) => (form = v))();
	vaccine$.subscribe((v) => {
		vaccine = {
			examDate: v?.examDate,
			examLocation: v?.examLocation,
			examReceiveDate: v?.examReceiveDate,
			vaccines: v?.vaccines.filter((vac) => JSON.stringify(vac) !== '{}')
		};
	})();

	if (
		!id &&
		!illnesses &&
		!symptoms &&
		(JSON.stringify(form) === '{}' || !form) &&
		(!vaccine || !vaccine.vaccines?.length)
	)
		return;

	window.localStorage.setItem(
		'draftTicket',
		JSON.stringify({
			id,
			illnesses,
			symptoms,
			form,
			vaccine
		})
	);
}

export function setProfileFromStorage() {
	const { id, illnesses, symptoms, form, vaccine } = JSON.parse(
		window.localStorage.getItem('draftTicket')
	);
	setPatientId(id || null);
	setIllnesses(illnesses || null);
	setSymptoms(symptoms || null);
	setVaccine(
		vaccine
			? {
					...vaccine,
					examDate: vaccine.examDate ? new Date(vaccine.examDate) : undefined,
					examReceiveDate: vaccine.examReceiveDate ? new Date(vaccine.examReceiveDate) : undefined,
					vaccines: vaccine.vaccines?.length
						? vaccine.vaccines.map((v: Vaccine) => ({
								name: v.name,
								dateReceived: v.dateReceived ? new Date(v.dateReceived) : undefined
						  }))
						: [{ name: undefined, dateReceived: undefined }]
			  }
			: null
	);
	setForm(
		form
			? {
					...form,
					dob: form.dob ? new Date(form.dob) : undefined
			  }
			: null
	);
}
