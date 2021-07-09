<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Button from '$lib/components/ui/button/index.svelte';
</script>

<svelte:head>
	<title>{$_('home_title')}</title>
</svelte:head>

<section>
	{$_('home_title')}

	<Button />
</section>
