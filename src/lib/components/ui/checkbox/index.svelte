<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import Fa from '$lib/components/ui/fa/index.svelte';

	let clazz = '';

	export let checked = false;
	export let placeholder = '';
	export { clazz as class };
</script>

<div class="flex justify-start items-start {clazz}">
	<div
		class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
	>
		<input type="checkbox" bind:checked class="opacity-0 absolute" />
		<Fa class={!checked ? 'hidden' : 'block'} icon={faCheck} />
	</div>
	<div class="select-none">{$_(placeholder)}</div>
</div>
