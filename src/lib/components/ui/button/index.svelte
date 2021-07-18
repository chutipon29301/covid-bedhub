<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

	export let placeholder = 'button_placeholder';
	export let isFullWidth = false;
	export let disabled = false;
	const dispatch = createEventDispatcher();
</script>

<button
	on:click={() => dispatch('click')}
	class="bg-indigo-500 px-4 py-3 rounded text-gray-200 font-semibold hover:bg-indigo-600 disabled:bg-gray-200 disabled:cursor-default disabled:text-gray-400"
	class:w-full={isFullWidth}
	{disabled}
>
	{$_(placeholder)}
</button>
