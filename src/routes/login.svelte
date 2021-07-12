<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { loginWithLine } from '$lib/services/authService';
	import { ROUTES } from '$lib/constants/routes';
	import Button from '$lib/components/ui/button/index.svelte';

	const code = $page.query.get('code');

	onMount(async () => {
		if (!code) return;
		const hasPatient = await loginWithLine(code);
		if (hasPatient) goto(ROUTES.HOME);
		else goto(ROUTES.PATIENT_CHECK);
	});

	function redirect() {
		window.location.replace(import.meta.env.VITE_API_URL + '/auth/login');
	}
</script>

<svelte:head>
	<title>{$_('login_title')}</title>
</svelte:head>

<div class="text-3xl pb-2">{$_('login_title')}</div>
<Button isFullWidth={true} placeholder={'login_with_line_button'} on:click={() => redirect()} />
