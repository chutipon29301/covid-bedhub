import { writable } from 'svelte/store';

export const refreshTabAmount$ = writable<boolean>(false);
export function setRefresh(refresh: boolean) {
	refreshTabAmount$.set(refresh);
}
