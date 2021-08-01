import { writable } from 'svelte/store';

export const refreshAmount$ = writable<boolean>(false);
export function refreshAmount(bool: boolean): void {
	refreshAmount$.set(bool);
}
