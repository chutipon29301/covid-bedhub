<script lang="ts">
	import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
	import Fa from '$lib/components/ui/fa/index.svelte';

	let clazz = '';
	export { clazz as class };
	export let label = 'label';
	export let list: string[];
	export let value: string;
	export let errorMessage = '';
</script>

<div class="{clazz} text-lg text-gray-700 relative group inline-block w-full">
	<button
		class="text-lg focus:outline-none border rounded-md p-2 bg-white flex justify-between w-full"
		class:border-red-500={errorMessage}
	>
		<span
			class="px-2 text-lg bg-white duration-300 origin-top-left"
			class:px-5={!value}
			class:text-red-500={errorMessage}
		>
			{value || label}
		</span>
		<span />
		<Fa
			class="mt-1 mr-7 fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
			icon={faChevronDown}
		/>
	</button>
	{#if errorMessage}
		<span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
			{errorMessage}
		</span>
	{/if}
	<ul
		class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top w-full z-10"
	>
		{#each list as item}
			<li
				on:click={() => (value = value !== item ? item : '')}
				class="rounded-sm px-7 py-2 hover:bg-gray-100"
			>
				{item}
			</li>
		{/each}
	</ul>
</div>

<style>
	.group:hover .group-hover\:scale-100 {
		transform: scale(1);
	}
	.scale-0 {
		transform: scale(0);
	}
</style>
