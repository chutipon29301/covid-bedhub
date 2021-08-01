<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { form$, illnesses$, patientId$, setForm } from './store/store';
	import { onDestroy, onMount } from 'svelte';
	import { ROUTES } from '$lib/constants/routes';
	import { goto } from '$app/navigation';
	import {
		noFutureValidation,
		identificationValidation,
		mobileNumberValidation,
		nameValidation
	} from '$lib/util';
	import { saveProfileToStorage } from './store/util';
	import type { Gender } from '$lib/generated/graphql';
	import PatientForm from '$lib/components/patientForm/index.svelte';
	import Template from '$lib/components/ticketLayout/index.svelte';

	$: disabledContinueBtn =
		!id ||
		!firstName ||
		!lastName ||
		!dob ||
		!sex ||
		!mobile ||
		!nameValidation(firstName) ||
		!nameValidation(firstName) ||
		(!identificationValidation(id) && !existed) ||
		!mobileNumberValidation(mobile) ||
		(!noFutureValidation(dob) && !existed);

	let id: string = $form$?.id,
		firstName: string = $form$?.firstName,
		lastName: string = $form$?.lastName,
		dob: Date = $form$?.dob,
		sex: Gender = $form$?.sex,
		mobile: string = $form$?.mobile,
		existed = $patientId$;

	onMount(() => {
		if (!$illnesses$) goto(ROUTES.TICKET);
	});

	onDestroy(() => {
		setForm({
			id,
			dob,
			firstName,
			lastName,
			sex,
			mobile
		});
		saveProfileToStorage();
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
	<PatientForm
		bind:id
		bind:firstName
		bind:lastName
		bind:dob
		bind:sex
		bind:mobile
		disabled={{ id: !!existed, dob: !!existed }}
	/>
</Template>
