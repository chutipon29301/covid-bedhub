<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { OfficerLogin } from '$lib/generated/graphql';
	import { setIsLoading, setIsLogin } from '$lib/store';
	import { AccountType } from '$lib/models';
	import { storeToken } from '$lib/util';
	import type { DecodedJwt } from '$lib/models';
	import Input from '$lib/components/ui/input/index.svelte';
	import Button from '$lib/components/ui/button/index.svelte';
	import Layout from '$lib/components/ui/fullscreenLayout/index.svelte';
	import jwt_decoder from 'jwt-decode';

	let username = 'Carole67';
	let password = 'password';

	async function login() {
		setIsLoading(true);
		const { data } = await OfficerLogin({ variables: { data: { username, password } } });
		setIsLoading(false);
		if (data) {
			const { token, expireDate } = data.officerLogin;
			const { accountType } = jwt_decoder<DecodedJwt>(data.officerLogin.token);

			storeToken(token, expireDate);
			setIsLogin(true);

			if (accountType === AccountType.CODE) goto(ROUTES.HEALTHCARE_CODE);
			else if (accountType === AccountType.QUEUE) goto(ROUTES.HEALTHCARE_QUEUE);
			else if (accountType === AccountType.STAFF) goto(ROUTES.HEALTHCARE_STAFF);
		}
	}
</script>

<svelte:head>
	<title>{$_('healthcare_title')}</title>
</svelte:head>

<Layout title={$_('healthcare_title')}>
	<span slot="content">
		<Input class="pb-2" bind:value={username} label="Username" />
		<Input class="pb-4" type="password" bind:value={password} label="Password" />
		<Button class="w-full" placeholder={$_('login_title')} on:click={login} />
	</span>
	<span slot="footer">
		<div
			class="font-bold underline text-sm flex justify-center cursor-pointer"
			on:click={() => goto(ROUTES.HEALTHCARE_INVITE)}
		>
			{$_('regiter_button')}
		</div>
	</span>
</Layout>
