<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/ui/button/index.svelte';

	export let disabledContinueBtn = false;
	export let btnPlaceholer: string;
	export let title = 'title';
	export let description = '';

	const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col min-h-content">
	<div class="flex-grow pb-4">
		<div class="text-3xl pb-4">{title}</div>
		{#if description}
			<div class="text-md pb-4">{description}</div>
		{/if}
		<slot />
	</div>
	<div>
		<Button
			disabled={disabledContinueBtn}
			class="w-full"
			on:click={() => dispatch('click')}
			placeholder={btnPlaceholer}
		/>
	</div>
</div>

<style>
	.min-h-content {
		min-height: calc(100vh - 7rem);
	}
</style>
