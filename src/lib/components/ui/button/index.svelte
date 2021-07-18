<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

	export let placeholder = 'button_placeholder';
	export let isFullWidth = false;
	export let disabled = false;
	export let color = 'bg-indigo-400 hover:bg-indigo-500';
	const dispatch = createEventDispatcher();
</script>

<button
	on:click={() => dispatch('click')}
	class="{color} px-4 py-3 rounded text-gray-200 font-semibold disabled:bg-gray-200 disabled:cursor-default disabled:text-gray-400"
	class:w-full={isFullWidth}
	{disabled}
>
	{$_(placeholder)}
</button>
