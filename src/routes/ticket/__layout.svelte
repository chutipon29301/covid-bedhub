<script lang="ts">
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { disabledContinueBtn$ } from './store/store';
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';
	import Button from '$lib/components/ui/button/index.svelte';

	const paths: string[] = [ROUTES.TICKET_VACCINE, ROUTES.TICKET_SYMPTOM, ROUTES.HOME];
	let currentRoute: string;
	const subscription = page.subscribe((p) => (currentRoute = p.path));
	onDestroy(() => subscription());
</script>

<div class="flex flex-col">
	<div class="min-h-content pb-4">
		<slot />
	</div>
	{#if currentRoute !== ROUTES.TICKET}
		<div>
			<Button
				disabled={$disabledContinueBtn$}
				isFullWidth={true}
				on:click={() => goto(paths[paths.findIndex((v) => v === currentRoute) + 1])}
				placeholder="contunue_button"
			/>
		</div>
	{/if}
</div>

<style>
	.min-h-content {
		min-height: calc(100vh - 10rem);
	}
</style>
