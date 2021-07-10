<script lang="ts">
	import Button from '$lib/components/ui/button/index.svelte';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';
	import { disabledContinueBtn$, setDisabledContinueBtn } from './store/store';

	const paths: string[] = [ROUTES.PROFILE_CHECK, ROUTES.PROFILE_ADD, ROUTES.HOME];
	let currentRoute: string;
	const subscription = page.subscribe((p) => {
		currentRoute = p.path;
	});

	setDisabledContinueBtn(true);

	onDestroy(() => subscription());
</script>

<div class="flex flex-col">
	<main class="flex-grow h-content">
		<slot />
	</main>
	<div>
		<Button
			disabled={$disabledContinueBtn$}
			isFullWidth={true}
			on:click={() => goto(paths[paths.findIndex((v) => v === currentRoute) + 1])}
			placeholder="contunue_button"
		/>
	</div>
</div>

<style>
	.h-content {
		height: calc(100vh - 10rem);
	}
</style>
