<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	let clazz = '';
	export { clazz as class };
	export let src = '';
	export let alt: string;
	export let dataSrc: string;
	export let height = 'auto';
	export let width = 'auto';
	export let aspectRatio = '';

	const dispatch = createEventDispatcher();
	let loadedFullImage = false;
	let loadedProgressiveImage = false;
	let image: HTMLImageElement;

	onMount(() => {
		const img = new Image();
		img.src = dataSrc;
		img.onload = () => {
			if (!image) return;
			image.src = img.src;
			loadedFullImage = true;
		};
		image.onload = () => {
			loadedProgressiveImage = true;
		};
	});
</script>

<div
	class={clazz}
	style="height: {height}; width: {width}"
	class:blur-md={!loadedFullImage}
	class:hidden={!aspectRatio || loadedProgressiveImage}
	class:aspect-ratio-1-1={!loadedProgressiveImage && aspectRatio === '1/1'}
	class:aspect-ratio-2-1={!loadedProgressiveImage && aspectRatio === '2/1'}
	on:click={() => dispatch('click')}
/>
<img
	class={clazz}
	{width}
	style="height: {height}"
	{src}
	{alt}
	class:blur-md={!loadedFullImage}
	class:hidden={aspectRatio && !loadedProgressiveImage}
	bind:this={image}
	on:click={() => dispatch('click')}
/>

<style>
	.aspect-ratio-2-1 {
		padding-bottom: 50%;
	}
	.aspect-ratio-1-1 {
		padding-bottom: 100%;
	}
</style>
