import { writable } from 'svelte/store';
import type { IllnessChecklist, Patient, SymptomChecklist } from '$lib/models';
import type { VaccineInfo } from './models';

export const form$ = writable<Patient>(null);
export function setForm(form: Patient): void {
	form$.set(form);
}

export const vaccine$ = writable<VaccineInfo>(null);
export function setVaccine(vaccine: VaccineInfo): void {
	vaccine$.set(vaccine);
}

export const symptoms$ = writable<SymptomChecklist>(null);
export function setSymptoms(symptoms: SymptomChecklist): void {
	symptoms$.set(symptoms);
}

export const illnesses$ = writable<IllnessChecklist>(null);
export function setIllnesses(illnesses: IllnessChecklist): void {
	illnesses$.set(illnesses);
}

export const patientId$ = writable<string>(null);
export function setPatientId(id: string): void {
	patientId$.set(id);
}
