<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let clazz = '';
	export { clazz as class };
	export let options: string[];
	export let selected = 0;

	const dispatch = createEventDispatcher();

	function handleSelectOption(index: number) {
		selected = index;
		dispatch('selectOption', index);
	}
</script>

<div class="{clazz} flex justify-center items-center">
	<div class="bg-gray-200 rounded-md">
		{#each options as option, i}
			<div class="inline-flex rounded-md" on:click={() => handleSelectOption(i)}>
				<input type="radio" class="" checked={selected === i} hidden />
				<div
					class="radio flex justify-center items-center text-sm p-3 rounded-md cursor-pointer hover:opacity-75 
          {selected === i ? 'bg-indigo-400 text-white' : ''}"
				>
					{option}
				</div>
			</div>
		{/each}
	</div>
</div>
