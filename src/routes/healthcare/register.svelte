<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Input from '$lib/components/ui/input/index.svelte';
	import Button from '$lib/components/ui/button/index.svelte';
	import Layout from '$lib/components/ui/fullscreenLayout/index.svelte';
	import { ROUTES } from '$lib/constants/routes';
	import { goto } from '$app/navigation';

	let username: string,
		password: string,
		passwordCheck: string,
		firstName: string,
		lastName: string,
		officerId: string;

	function register() {
		console.log('register');
		goto(ROUTES.HEALTHCARE);
	}
</script>

<svelte:head>
	<title>{$_('healthcare_register_title')}</title>
</svelte:head>

<Layout title={$_('healthcare_register_title')}>
	<span slot="content">
		<div class="pb-4 font-bold">
			<p>โรงพยาบาล:</p>
			<p>Invite Code:</p>
			<p>ประเภทเจ้าหน้าที่:</p>
		</div>
		<Input class="pb-2" bind:value={username} label={$_('username_label')} />
		<Input class="pb-4" type="password" bind:value={password} label={$_('password_label')} />
		<Input class="pb-4" bind:value={passwordCheck} label={$_('confirm_password_label')} />
		<Input class="pb-4" bind:value={firstName} label={$_('patient_first_name_information')} />
		<Input class="pb-4" bind:value={lastName} label={$_('patient_last_name_information')} />
		<Input class="pb-4" bind:value={officerId} label={$_('officer_id_label')} />
	</span>
	<span slot="footer">
		<Button class="w-full" placeholder={$_('regiter_button')} on:click={register} />
	</span>
</Layout>
