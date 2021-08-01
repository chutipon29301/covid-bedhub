<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { CheckAccessCode } from '$lib/generated/graphql';
	import { setIsLoading } from '$lib/store';
	import { setAccessCode, setHospitalName, setUserType } from './store/store';
	import Input from '$lib/components/ui/input/index.svelte';
	import Button from '$lib/components/ui/button/index.svelte';
	import Layout from '$lib/components/ui/fullscreenLayout/index.svelte';
	import Alert from '$lib/components/ui/modal/dialog/index.svelte';
	import { faExclamation } from '@fortawesome/free-solid-svg-icons';
	import { EModalColorTone } from '$lib/components/ui/modal/model';

	let access_code: string;
	let alertShown = false;

	function validateInviteCode() {
		if (!access_code) return;
		const response = CheckAccessCode({ variables: { access_code: access_code.toUpperCase() } });
		const unsub = response.subscribe(({ data, loading }) => {
			setIsLoading(loading);
			if (!data) return;
			if (!data.checkAccessCode) {
				alertShown = true;
				unsub();
				return;
			}
			setHospitalData(
				data.checkAccessCode.hospital.name,
				data.checkAccessCode.accessCode,
				data.checkAccessCode.userType
			);
			unsub();
			goto(ROUTES.HEALTHCARE_REGISTER);
		});
	}

	function setHospitalData(hospitalName: string, accessCode: string, userType: string) {
		setHospitalName(hospitalName);
		setAccessCode(accessCode);
		setUserType(userType);
	}

	function onkeypress(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;
		validateInviteCode();
	}
</script>

<svelte:head>
	<title>{$_('healthcare_invite_title')}</title>
</svelte:head>

{#if alertShown}
	<Alert
		heading={$_('general_error_headline')}
		icon={faExclamation}
		confirmBtn="OK"
		colorTone={EModalColorTone.RED}
		on:confirm={() => (alertShown = false)}
	>
		{$_('access_code_invalid_error')}
	</Alert>
{/if}
<Layout title={$_('healthcare_invite_title')}>
	<span slot="content">
		<span on:keypress={onkeypress}>
			<Input
				class="pb-4"
				classInput="uppercase"
				bind:value={access_code}
				label={$_('invitation_code')}
			/>
			<Button
				disabled={!access_code}
				class="w-full"
				placeholder={$_('continue_button')}
				on:click={validateInviteCode}
			/>
		</span>
	</span>
	<span slot="footer">
		<div
			class="font-bold underline text-sm flex justify-center cursor-pointer"
			on:click={() => goto(ROUTES.HEALTHCARE)}
		>
			{$_('login_title')}
		</div>
		<div class="text-center mt-12 text-lg">
			{$_('query_info_label')}<br />{$_('facebook_page_label')}:
			<a
				class="font-bold cursor-pointer underline"
				href="https://www.facebook.com/thaibedhub"
				target="_blank"
			>
				Thaibedhub
			</a>
		</div>
	</span>
</Layout>
