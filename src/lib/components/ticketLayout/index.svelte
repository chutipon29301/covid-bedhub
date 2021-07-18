<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/ui/button/index.svelte';

	export let disabledContinueBtn = false;
	export let btnPlaceholer: string;

	const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col">
	<div class="min-h-content pb-4">
		<slot />
	</div>
	<div>
		<Button
			disabled={disabledContinueBtn}
			isFullWidth={true}
			on:click={() => dispatch('click')}
			placeholder={btnPlaceholer}
		/>
	</div>
</div>

<style>
	.min-h-content {
		min-height: calc(100vh - 10rem);
	}
</style>
