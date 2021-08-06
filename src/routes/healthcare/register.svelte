<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { ROUTES } from '$lib/constants/routes';
	import { goto } from '$app/navigation';
	import { accessCode$, hospitalName$, userType$ } from './store/store';
	import { CreateOfficer } from '$lib/generated/graphql';
	import { setIsLoading } from '$lib/store';
	import { onMount } from 'svelte';
	import { nameValidation, passwordValidation, usernameValidation } from '$lib/util';
	import Input from '$lib/components/ui/input/index.svelte';
	import Button from '$lib/components/ui/button/index.svelte';
	import Layout from '$lib/components/ui/fullscreenLayout/index.svelte';
	import Modal from '$lib/components/ui/modal/dialog/index.svelte';
	import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
	import { EModalColorTone } from '$lib/components/ui/modal/model';
	import { USER_TYPE } from '$lib/constants/constant';

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
		userType = $userType$,
		successPopupShown = false;

	onMount(() => {
		if (!$hospitalName$) goto(ROUTES.HEALTHCARE_INVITE);
	});

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
		if (data) successPopupShown = true;
	}

	function onClickOkPopup() {
		successPopupShown = false;
		goto(ROUTES.HEALTHCARE);
	}
</script>

<svelte:head>
	<title>{$_('healthcare_register_title')}</title>
</svelte:head>

{#if successPopupShown}
	<Modal
		icon={faCheckCircle}
		heading={$_('register_success_popup_heading')}
		confirmBtn={'OK'}
		colorTone={EModalColorTone.GREEN}
		on:confirm={onClickOkPopup}
	>
		{$_('register_success_message', { values: { name: `${firstName} ${lastName}` } })}
	</Modal>
{/if}
<Layout title={$_('healthcare_register_title')}>
	<span slot="content">
		<div class="pb-4 font-bold">
			<p>โรงพยาบาล: {hospitalName}</p>
			<p>Invite Code: {accessCode}</p>
			<p>ประเภทเจ้าหน้าที่: {USER_TYPE[userType]}</p>
		</div>
		<Input
			required={true}
			class="pb-2"
			bind:value={username}
			label={$_('username_label')}
			errorMessage={usernameValidation(username)
				? ''
				: $_('validation_inline_error', { values: { field: $_('username_label') } })}
		/>
		<Input
			required={true}
			class="pb-4"
			type="password"
			bind:value={password}
			errorMessage={passwordValidation(password)
				? ''
				: $_('validation_inline_error', { values: { field: $_('password_label') } })}
			label={$_('password_label')}
		/>
		<Input
			required={true}
			class="pb-4"
			type="password"
			bind:value={confirmPassword}
			errorMessage={password === confirmPassword
				? ''
				: $_('validation_inline_error', { values: { field: $_('confirm_password_label') } })}
			label={$_('confirm_password_label')}
		/>
		<Input
			required={true}
			class="pb-4"
			bind:value={firstName}
			errorMessage={nameValidation(firstName)
				? ''
				: $_('validation_inline_error', {
						values: { field: $_('patient_first_name_information') }
				  })}
			label={$_('patient_first_name_information')}
		/>
		<Input
			required={true}
			class="pb-4"
			bind:value={lastName}
			errorMessage={nameValidation(lastName)
				? ''
				: $_('validation_inline_error', { values: { field: $_('patient_last_name_information') } })}
			label={$_('patient_last_name_information')}
		/>
		<Input class="pb-4" bind:value={employeeId} label={$_('officer_id_label')} />
	</span>
	<span slot="footer">
		<div class="text-center text-sm pb-2">
			{$_('disclaimer_label_1', { values: { button: $_('regiter_button') } })}
			<br />
			<span
				class="font-bold underline cursor-pointer"
				on:click={() => goto(ROUTES.TERMS_AND_CONDITION)}>{$_('tnc_label')}</span
			>
			{$_('and_label')}
			<span class="font-bold underline cursor-pointer" on:click={() => goto(ROUTES.PRIVACY_POLICY)}>
				{$_('policy_label')}
			</span>
			<br />
			{$_('disclaimer_label_2')}
		</div>
		<Button
			disabled={disabledRegisterBtn}
			class="w-full"
			placeholder={$_('regiter_button')}
			on:click={register}
		/>
	</span>
</Layout>
