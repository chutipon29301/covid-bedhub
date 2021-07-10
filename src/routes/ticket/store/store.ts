import { writable } from 'svelte/store';
import {
	IProfile,
	initProfile,
	IVaccineInfo,
	initVaccineInfo,
	initSymptoms,
	ISymptoms
} from './models';

export const disabledContinueBtn$ = writable<boolean>(false);
export function setDisabledContinueBtn(status: boolean): void {
	disabledContinueBtn$.set(status);
}

export const form$ = writable<IProfile>(initProfile);
export function setForm(form: IProfile): void {
	form$.set(form);
}

export const vaccine$ = writable<IVaccineInfo>(initVaccineInfo);
export function setVaccine(vaccine: IVaccineInfo): void {
	vaccine$.set(vaccine);
}

export const symptoms$ = writable<ISymptoms>(initSymptoms);
export function setSymptoms(symptoms: ISymptoms): void {
	symptoms$.set(symptoms);
}
