<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import Button from '$lib/components/ui/button/index.svelte';

	export let disabledContinueBtn = false;
	export let btnPlaceholer: string;
	export let title = 'title';
	export let description = '';

	const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col">
	<div class="pb-4">
		<div class="text-3xl pb-4">{title}</div>
		{#if description}
			<div class="text-md pb-4">{description}</div>
		{/if}
		<slot />
	</div>
	<div>
		<div class="text-center text-sm">
			{$_('disclaimer_label_1', { values: { button: btnPlaceholer } })}
			<br />
			<span
				class="font-bold underline cursor-pointer"
				on:click={() => goto(ROUTES.TERMS_AND_CONDITION)}>{$_('tnc_label')}</span
			>
			{$_('and_label')}
			<span class="font-bold underline cursor-pointer" on:click={() => goto(ROUTES.PRIVACY_POLICY)}>
				{$_('policy_label')}
			</span>
			<br />
			{$_('disclaimer_label_2')}
		</div>
		<Button
			disabled={disabledContinueBtn}
			class="w-full"
			on:click={() => dispatch('click')}
			placeholder={btnPlaceholer}
		/>
	</div>
</div>
