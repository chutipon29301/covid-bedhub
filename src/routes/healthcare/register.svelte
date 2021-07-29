<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { ROUTES } from '$lib/constants/routes';
	import { goto } from '$app/navigation';
	import { accessCode$, hospitalName$, userType$ } from './store/store';
	import { CreateOfficer } from '$lib/generated/graphql';
	import { setIsLoading } from '$lib/store';
	import { nameValidation, passwordValidation, usernameValidation } from '$lib/util';
	import Input from '$lib/components/ui/input/index.svelte';
	import Button from '$lib/components/ui/button/index.svelte';
	import Layout from '$lib/components/ui/fullscreenLayout/index.svelte';

	$: disabledRegisterBtn =
		!username ||
		!password ||
		!confirmPassword ||
		!firstName ||
		!lastName ||
		!hospitalName ||
		!accessCode ||
		!userType ||
		!usernameValidation(username) ||
		!passwordValidation(password) ||
		password !== confirmPassword ||
		!nameValidation(firstName) ||
		!nameValidation(lastName);

	let username: string,
		password: string,
		confirmPassword: string,
		firstName: string,
		lastName: string,
		employeeId: string,
		hospitalName = $hospitalName$,
		accessCode = $accessCode$,
		userType = $userType$;

	async function register() {
		if (disabledRegisterBtn) return;
		setIsLoading(true);
		const { data } = await CreateOfficer({
			variables: {
				data: {
					accessCode,
					username,
					password,
					firstName,
					lastName,
					employeeId
				}
			}
		});
		setIsLoading(false);
		if (data) goto(ROUTES.HEALTHCARE);
	}
</script>

<svelte:head>
	<title>{$_('healthcare_register_title')}</title>
</svelte:head>

<Layout title={$_('healthcare_register_title')}>
	<span slot="content">
		<div class="pb-4 font-bold">
			<p>โรงพยาบาล: {hospitalName}</p>
			<p>Invite Code: {accessCode}</p>
			<p>ประเภทเจ้าหน้าที่: {userType}</p>
		</div>
		<Input
			required={true}
			class="pb-2"
			bind:value={username}
			label={$_('username_label')}
			errorMessage={usernameValidation(username) ? '' : $_('validation_inline_error')}
		/>
		<Input
			required={true}
			class="pb-4"
			type="password"
			bind:value={password}
			errorMessage={passwordValidation(password) ? '' : $_('validation_inline_error')}
			label={$_('password_label')}
		/>
		<Input
			required={true}
			class="pb-4"
			type="password"
			bind:value={confirmPassword}
			errorMessage={password === confirmPassword ? '' : $_('validation_inline_error')}
			label={$_('confirm_password_label')}
		/>
		<Input
			required={true}
			class="pb-4"
			bind:value={firstName}
			errorMessage={nameValidation(firstName) ? '' : $_('validation_inline_error')}
			label={$_('patient_first_name_information')}
		/>
		<Input
			required={true}
			class="pb-4"
			bind:value={lastName}
			errorMessage={nameValidation(lastName) ? '' : $_('validation_inline_error')}
			label={$_('patient_last_name_information')}
		/>
		<Input class="pb-4" bind:value={employeeId} label={$_('officer_id_label')} />
	</span>
	<span slot="footer">
		<Button
			disabled={disabledRegisterBtn}
			class="w-full"
			placeholder={$_('regiter_button')}
			on:click={register}
		/>
	</span>
</Layout>
