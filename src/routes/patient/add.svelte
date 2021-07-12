<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { form$, setDisabledContinueBtn, setForm } from './store/store';
	import { onDestroy } from 'svelte';
	import PatientForm from '$lib/components/patientForm/index.svelte';

	let {
		id,
		firstName,
		lastName,
		dob,
		sex,
		address,
		subDistrict,
		district,
		province,
		zipcode,
		mobile,
		illnesses
	} = $form$;

	$: disabled =
		!!id &&
		!!firstName &&
		!!lastName &&
		!!dob &&
		!!sex &&
		!!address &&
		!!subDistrict &&
		!!district &&
		!!province &&
		!!zipcode &&
		!!mobile &&
		!!illnesses;

	$: setDisabledContinueBtn(!disabled);

	onDestroy(() => {
		setForm({
			id,
			dob,
			firstName,
			lastName,
			sex,
			address,
			subDistrict,
			district,
			province,
			zipcode,
			mobile,
			illnesses
		});
	});
</script>

<svelte:head>
	<title>{$_('profile_add_title')}</title>
</svelte:head>

<PatientForm
	bind:id
	bind:firstName
	bind:lastName
	bind:dob
	bind:sex
	bind:address
	bind:subDistrict
	bind:district
	bind:province
	bind:zipcode
	bind:mobile
	disabled={{ id: true, dob: true }}
/>
