import { writable } from 'svelte/store';
import { Patient, initPatient } from '$lib/models';

export const disabledContinueBtn$ = writable<boolean>(false);
export function setDisabledContinueBtn(status: boolean): void {
	disabledContinueBtn$.set(status);
}

export const form$ = writable<Patient>(initPatient);
export function setForm(form: Patient): void {
	form$.set(form);
}
