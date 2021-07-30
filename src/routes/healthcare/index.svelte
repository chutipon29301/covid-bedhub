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

	let username: string;
	let password: string;

	async function login() {
		if (import.meta.env.VITE_DEVELOP) {
			handleDevMode();
			return;
		}

		setIsLoading(true);
		const { data } = await OfficerLogin({ variables: { data: { username, password } } });
		setIsLoading(false);
		if (data) {
			const { token, expireDate } = data.officerLogin;
			const { accountType } = jwt_decoder<DecodedJwt>(data.officerLogin.token);

			storeToken(token, expireDate);
			setIsLogin(true);

			switch (accountType) {
				case AccountType.CODE:
					goto(ROUTES.HEALTHCARE_CODE);
					break;
				case AccountType.QUEUE:
					goto(ROUTES.HEALTHCARE_QUEUE);
					break;
				case AccountType.STAFF:
					goto(ROUTES.HEALTHCARE_STAFF);
					break;
				default:
					goto(ROUTES.LANDING);
					break;
			}
		}
	}

	function handleDevMode() {
		switch (username.toLocaleLowerCase()) {
			case 'code':
				storeToken('code_generator-1', new Date(8640000000000000));
				setIsLogin(true);
				goto(ROUTES.HEALTHCARE_CODE);
				break;
			case 'queue':
				storeToken('queue_manager-1', new Date(8640000000000000));
				setIsLogin(true);
				goto(ROUTES.HEALTHCARE_QUEUE);
				break;
			case 'staff':
				storeToken('staff-1', new Date(8640000000000000));
				setIsLogin(true);
				goto(ROUTES.HEALTHCARE_STAFF);
				break;
			default:
				break;
		}
	}

	function onkeypress(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;
		login();
	}
</script>

<svelte:head>
	<title>{$_('healthcare_title')}</title>
</svelte:head>

<Layout title={$_('healthcare_title')}>
	<span on:keypress={onkeypress} slot="content">
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
