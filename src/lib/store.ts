import { writable } from 'svelte/store';

export const isLogin$ = writable<boolean>(true);
export function setIsLogin(): void {
	isLogin$.update((status) => !status);
}

export const isLoading$ = writable<boolean>(false);
export function setIsLoading(status: boolean): void {
	isLoading$.set(status);
}
