<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';
	import Card from '$lib/components/ui/card/general/index.svelte';
	import Button from '$lib/components/ui/button/index.svelte';
	import Input from '$lib/components/ui/input/index.svelte';

	export let title: string;
	export let code: string;

	const dispatch = createEventDispatcher();

	let editing = false,
		value: string,
		copyCodeLabel = 'copy_code_button',
		submitButtonLabel = copyCodeLabel,
		errorMessage = '';

	function toggleCode() {
		errorMessage = '';
		editing = !editing;
		value = code;
	}

	function handleSubmitButton() {
		if (editing) {
			saveNewCode();
			return;
		}
		copyToClipboard();
	}

	function saveNewCode() {
		if (value.length > 6) {
			errorMessage = 'The code cannot exceed 6 characters';
			return;
		}
		dispatch('save', value);
		editing = !editing;
	}

	function copyToClipboard() {
		var dummy = document.createElement('textarea');
		document.body.appendChild(dummy);
		dummy.value = code;
		dummy.select();
		document.execCommand('copy');
		document.body.removeChild(dummy);
		submitButtonLabel = 'Copied!';
		setTimeout(() => {
			submitButtonLabel = copyCodeLabel;
		}, 1500);
	}
</script>

<Card class="pb-8" title={$_(title)}>
	<span slot="content">
		{#if editing}
			<span class="card-content">
				<Input class="min-h-70px pt-2" bind:value label={$_('invitation_code')} {errorMessage} />
			</span>
		{:else}
			<div class="card-content bg-gray-100 rounded-lg">
				<div class="py-4 px-4 min-h-70px">
					<p class="text-2xl flex justify-center">
						{code}
					</p>
				</div>
			</div>
		{/if}
	</span>
	<span slot="footer">
		<div class="grid grid-cols-2 justify-center gap-2">
			<Button
				class="text-sm"
				color="white"
				placeholder={$_(editing ? 'cancel_button' : 'edit_code_button')}
				on:click={toggleCode}
			/>
			<Button
				class="text-sm"
				placeholder={$_(editing ? 'save_button' : submitButtonLabel)}
				on:click={handleSubmitButton}
			/>
		</div>
	</span>
</Card>

<style>
	.card-content :global(input) {
		text-align: center;
	}
	.card-content :global(.min-h-70px) {
		min-height: 70px;
	}
</style>
