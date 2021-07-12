import { Patient, initPatient } from '$lib/models';
import { writable } from 'svelte/store';

export const accessToken$ = writable<string>(null);
export function setAccessToken(token: string): void {
	accessToken$.set(token);
}

export const isLogin$ = writable<boolean>(false);
export function setIsLogin(status: boolean): void {
	isLogin$.set(status);
}

export const isLoading$ = writable<boolean>(false);
export function setIsLoading(status: boolean): void {
	isLoading$.set(status);
}

export const userProfile$ = writable<Patient>(initPatient);
export function setUserProfile(userProfile: Patient): void {
	userProfile$.set(userProfile);
}
