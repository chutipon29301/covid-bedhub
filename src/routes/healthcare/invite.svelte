<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import Input from '$lib/components/ui/input/index.svelte';
	import Button from '$lib/components/ui/button/index.svelte';
	import Layout from '$lib/components/ui/fullscreenLayout/index.svelte';

	let inviteCode: string;

	function validateInviteCode() {
		console.log(inviteCode);
		goto(ROUTES.HEALTHCARE_REGISTER);
	}
</script>

<svelte:head>
	<title>{$_('healthcare_invite_title')}</title>
</svelte:head>

<Layout title={$_('healthcare_invite_title')}>
	<span slot="content">
		<Input class="pb-4" bind:value={inviteCode} label={$_('invitation_code')} />
		<Button class="w-full" placeholder={$_('continue_button')} on:click={validateInviteCode} />
	</span>
	<span slot="footer">
		<div
			class="font-bold underline text-sm flex justify-center cursor-pointer"
			on:click={() => goto(ROUTES.HEALTHCARE_INVITE)}
		>
			{$_('login_title')}
		</div>
	</span>
</Layout>
