<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

	export let placeholder = 'button';
	export let isFullWidth = false;
	const dispatch = createEventDispatcher();
</script>

<button
	on:click={() => dispatch('click')}
	class="bg-blue-500 px-4 py-3 rounded text-gray-200 font-semibold hover:bg-blue-600"
	class:w-full={isFullWidth}
>
	{$_(placeholder)}
</button>
