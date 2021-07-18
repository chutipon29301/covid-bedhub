<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let clazz = '';
	export { clazz as class };
	export let value: string | number;
	export let errorMessage = '';
	export let label = 'label';
	export let disabled = false;
	const dispatch = createEventDispatcher();
	let inputDOM;
</script>

<div class="mt-2 items-center z-10 {clazz}">
	<div
		class="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500"
		class:bg-gray-200={disabled}
		class:border-red-500={errorMessage}
	>
		<input
			placeholder=" "
			bind:this={inputDOM}
			bind:value
			readonly={disabled}
			on:keyup={(e) => dispatch('keyup', e)}
			class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
		/>
		<label
			for="password"
			on:click={() => inputDOM.focus()}
			class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 duration-300 origin-top-left"
		>
			{label}
		</label>
	</div>

	{#if errorMessage}
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
