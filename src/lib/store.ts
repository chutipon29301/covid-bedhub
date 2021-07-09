import { Writable, writable } from 'svelte/store';

export const isLogin$ = writable<boolean>(false);
export function getIsLogin(): Writable<boolean> {
	return isLogin$;
}
export function setIsLogin(): void {
	isLogin$.update((status) => !status);
}
