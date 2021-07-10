import { writable } from 'svelte/store';
import { IProfile, initProfile } from '$lib/models';

export const disabledContinueBtn$ = writable<boolean>(false);
export function setDisabledContinueBtn(status: boolean): void {
	disabledContinueBtn$.set(status);
}

export const form$ = writable<IProfile>(initProfile);
export function setForm(form: IProfile): void {
	form$.set(form);
}
