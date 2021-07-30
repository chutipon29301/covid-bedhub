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
	import { variables } from '$lib/constants/environment';

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
		if (variables.dev) {
			setIsLogin(true);
			storeToken('reporter-1', new Date(8640000000000000));
			goto(ROUTES.HOME);
			return;
		}
		window.location.replace(variables.url + '/auth/login');
	}
</script>

<svelte:head>
	<title>{$_('login_title')}</title>
</svelte:head>

<div class="login-button flex justify-center">
	<Button class="line-color" placeholder={$_('login_with_line_button')} on:click={() => redirect()}>
		<span slot="icon-front">
			<img src="/line_button/btn_base.png" alt="Line Login" width="32px" class="mr-4" />
		</span>
		<span slot="icon"><div class="pr-2" /></span>
	</Button>
</div>

<style>
	.login-button :global(.line-color) {
		background-color: #00c300;
	}
</style>
