<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { COLOR } from './models';

	let clazz = '';
	export { clazz as class };
	export let placeholder = 'button_placeholder';
	export let disabled = false;
	export let color: 'red' | 'blue' | 'white' | 'white-red' = 'blue';
	const dispatch = createEventDispatcher();

	$: _colorCss = getColorCss(color);

	function getColorCss(color: string) {
		switch (color) {
			case 'red':
				return COLOR.RED;
			case 'blue':
				return COLOR.BLUE;
			case 'white':
				return COLOR.WHITE_BLUE;
			case 'white-red':
				return COLOR.WHITE_RED;
		}
	}
</script>

<button
	on:click={() => dispatch('click')}
	class="{clazz} {_colorCss} px-4 py-3 rounded font-semibold disabled:bg-gray-200 disabled:cursor-default disabled:text-gray-400"
	class:hover:opacity-75={!disabled}
	{disabled}
>
	<div class="flex justify-center items-center">
		<slot name="icon-front" />
		{placeholder}
		<slot name="icon" />
	</div>
</button>
