import { writable } from 'svelte/store';

export const hospitalName$ = writable<string>(null);
export function setHospitalName(name: string): void {
	hospitalName$.set(name);
}

export const accessCode$ = writable<string>(null);
export function setAccessCode(code: string): void {
	accessCode$.set(code);
}

export const userType$ = writable<string>(null);
export function setUserType(type: string): void {
	userType$.set(type);
}
