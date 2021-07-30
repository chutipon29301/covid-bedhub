<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

	let clazz = '';
	export { clazz as class };
	export let classInput = '';
	export let value: string | number = undefined;
	export let errorMessage = '';
	export let label = 'label';
	export let disabled = false;
	export let type = 'text';
	export let required = false;
	const dispatch = createEventDispatcher();
	let inputDOM: HTMLElement;

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}

	function onInput(e: Event) {
		dispatch('input', e);
		if (!required) return;
		if (!value) errorMessage = $_('required_field_error');
		else if (errorMessage === $_('required_field_error')) errorMessage = '';
	}
</script>

<div class="mt-2 items-center {clazz}">
	<div
		class="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500"
		class:bg-gray-200={disabled}
		class:border-red-500={errorMessage && !disabled}
	>
		<input
			placeholder=" "
			bind:this={inputDOM}
			bind:value
			readonly={disabled}
			use:typeAction
			on:input={onInput}
			class="{classInput} block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
		/>
		<div class="absolute right-6 top-2"><slot name="end-icon" /></div>
		<label
			for="password"
			on:click={() => inputDOM.focus()}
			class="absolute ml-5 top-2 text-lg text-gray-700 duration-300 origin-top-left"
			class:text-red-500={errorMessage && !disabled}
			class:bg-transparent={disabled}
			class:bg-white={!disabled}
		>
			{label}{required ? '*' : ''}
		</label>
	</div>

	{#if errorMessage && !disabled}
		<span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
			{errorMessage}
		</span>
	{/if}
</div>

<style>
	.f-outline input:focus-within ~ label,
	.f-outline input:not(:placeholder-shown) ~ label {
		transform: translateY(-1.5rem) translatex(-1rem) scaleX(0.8) scaleY(0.8);
	}
</style>
