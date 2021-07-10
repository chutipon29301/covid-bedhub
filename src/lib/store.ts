import { IProfile, initProfile } from '$lib/models';
import { writable } from 'svelte/store';

export const isLogin$ = writable<boolean>(true);
export function setIsLogin(status: boolean): void {
	isLogin$.set(status);
}

export const isLoading$ = writable<boolean>(false);
export function setIsLoading(status: boolean): void {
	isLoading$.set(status);
}

export const userProfile$ = writable<IProfile>(initProfile);
export function setUserProfile(userProfile: IProfile): void {
	userProfile$.set(userProfile);
}
