<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { ROUTES } from '$lib/constants/routes';
	import { setIsLoading, setIsLogin } from '$lib/store';
	import { GetJwtFromLineCode } from '$lib/generated/graphql';
	import Button from '$lib/components/ui/button/index.svelte';
	import { storeToken } from '$lib/util';

	const code = $page.query.get('code');

	onMount(async () => {
		if (!code) return;

		setIsLoading(true);
		const response = await getJwt();
		setIsLogin(true);
		storeToken(response.token, response.expireDate);
		setIsLoading(false);
		goto(ROUTES.HOME);
	});

	async function getJwt() {
		const { data } = await GetJwtFromLineCode({ variables: { code } });
		return data.getJwtFromLineCode;
	}

	function redirect() {
		window.location.replace(import.meta.env.VITE_API_URL + '/auth/login');
	}
</script>

<svelte:head>
	<title>{$_('login_title')}</title>
</svelte:head>

<div class="text-3xl pb-2">{$_('login_title')}</div>
<Button isFullWidth={true} placeholder={'login_with_line_button'} on:click={() => redirect()} />
