<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { form$, setForm } from './store/store';
	import { onDestroy } from 'svelte';
	import PatientForm from '$lib/components/patientForm/index.svelte';
	import Template from '$lib/components/ticketLayout/index.svelte';
	import { ROUTES } from '$lib/constants/routes';
	import { goto } from '$app/navigation';

	$: disabledContinueBtn = !id || !firstName || !lastName || !dob || !sex || !mobile;

	let id: string = $form$?.id,
		firstName: string = $form$?.firstName,
		lastName: string = $form$?.lastName,
		dob: Date = $form$?.dob,
		sex: string = $form$?.sex,
		mobile: string = $form$?.mobile;

	onDestroy(() => {
		setForm({
			id,
			dob,
			firstName,
			lastName,
			sex,
			mobile
		});
	});

	function onClickProceed() {
		goto(ROUTES.TICKET_VACCINE);
	}
</script>

<svelte:head>
	<title>{$_('patient_add_title')}</title>
</svelte:head>
<Template
	title={$_('patient_add_title')}
	{disabledContinueBtn}
	btnPlaceholer={$_('continue_button')}
	on:click={() => onClickProceed()}
>
	<PatientForm bind:id bind:firstName bind:lastName bind:dob bind:sex bind:mobile disabled={{}} />
</Template>
