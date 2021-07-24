<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let tabs: string[];
	export let currentTab = 0;
	const dispatch = createEventDispatcher();

	function handleOnClickTab(index: number) {
		currentTab = index;
		dispatch('clickTab', currentTab);
	}
</script>

<ul class="inline-flex px-1 py-2 mx-8 mb-2">
	{#each tabs as tab, i}
		<li
			class="px-4 py-2 font-semibold text-gray-700 rounded-t cursor-pointer
        {currentTab === i ? '-mb-px border-b-2 border-indigo-400' : ' opacity-50'}"
			on:click={() => handleOnClickTab(i)}
		>
			{tab}
		</li>
	{/each}
</ul>
<slot />
