<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import Button from '$lib/components/ui/button/index.svelte';

	const code = $page.query.get('code');

	onMount(() => {
		if (code) {
			goto('/profile/add');
		}
	});

	function redirect() {
		window.location.replace(import.meta.env.VITE_API_URL + '/loginWithLine');
	}
</script>

<svelte:head>
	<title>{$_('login_title')}</title>
</svelte:head>

<div class="text-3xl pb-2">{$_('login_title')}</div>
<Button isFullWidth={true} placeholder={`Login with LINE`} on:click={() => redirect()} />
