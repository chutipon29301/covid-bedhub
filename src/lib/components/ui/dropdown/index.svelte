<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
	import Fa from '$lib/components/ui/fa/index.svelte';
	import { onMount } from 'svelte';

	interface DropdownList {
		label: string;
		value: unknown;
	}

	let clazz = '';
	export { clazz as class };
	export let label = 'label';
	export let list: DropdownList[];
	export let value: unknown;
	export let errorMessage = '';
	export let required = false;

	let display = false;
	let valueLabel: string;

	onMount(() => (valueLabel = list.find((v) => v.value === value)?.label));

	function selectItem(item: DropdownList) {
		display = !display;
		value = value !== item.value ? item.value : '';
		valueLabel = value ? item.label : '';
		if (!required) return;
		if (!value) errorMessage = $_('required_field_error');
		else if (errorMessage === $_('required_field_error')) errorMessage = '';
	}
</script>

<div class="{clazz} text-lg text-gray-700 relative group inline-block w-full">
	<div class="relative">
		<button
			class="button-height text-lg focus:outline-none border rounded-md p-2 bg-white flex justify-between w-full"
			class:border-red-500={errorMessage}
			on:click={() => (display = !display)}
		>
			<span
				class="px-2 text-lg bg-white duration-300 origin-top-left"
				class:px-5={!value}
				class:text-red-500={errorMessage}
			>
				{valueLabel || ''}
			</span>
			<span />
			<Fa
				class="mt-1 mr-7 fill-current h-4 w-4 transform transition duration-150 ease-in-out
				{display ? '-rotate-180' : ''}"
				icon={faChevronDown}
			/>
		</button>
		<label
			for=""
			class="absolute ml-8 top-0 text-lg text-gray-700 bg-white mt-2 duration-300 origin-top-left"
			class:cursor-pointer={!value}
			class:label-animation={valueLabel}
			on:click={() => (display = !display)}
		>
			{label}{required ? '*' : ''}
		</label>
	</div>
	{#if errorMessage}
		<span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
			{errorMessage}
		</span>
	{/if}
	<ul
		class="bg-white border rounded-sm transform scale-0 absolute transition duration-150 ease-in-out origin-top w-full z-10"
		class:scale-100={display}
	>
		{#each list as item}
			<li
				on:click={() => selectItem(item)}
				class="rounded-sm px-7 py-2 hover:bg-gray-100 cursor-pointer"
				class:bg-gray-200={value === item.value}
			>
				{item.label}
			</li>
		{/each}
	</ul>
</div>

<style>
	.label-animation {
		transform: translateY(-1.5rem) translatex(-1rem) scaleX(0.8) scaleY(0.8);
	}
	.button-height {
		height: 46.2px;
	}
</style>
