<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import Button from '$lib/components/ui/button/index.svelte';
</script>

<svelte:head>
	<title>{$_('home_title')}</title>
</svelte:head>

<div class="flex flex-col items-center">
	BANNER
	<Button isFullWidth={true} placeholder={'login_as_patient'} on:click={() => goto(ROUTES.LOGIN)} />
	BANNER
	<Button
		isFullWidth={true}
		placeholder={'login_as_officer'}
		on:click={() => goto(ROUTES.HEALTHCARE)}
	/>
	BANNER
</div>
