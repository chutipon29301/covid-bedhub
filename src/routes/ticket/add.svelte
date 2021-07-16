<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { setDisabledContinueBtn, setForm } from './store/store';
	import { userProfile$ } from '$lib/store';
	import { initPatient } from '$lib/models';
	import { onDestroy } from 'svelte';
	import PatientForm from '$lib/components/patientForm/index.svelte';

	const forOther = $page.query.get('other') === 'true';
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
	} = !forOther ? $userProfile$ : initPatient;

	$: setDisabledContinueBtn(
		!id ||
			!firstName ||
			!lastName ||
			!dob ||
			!sex ||
			!address ||
			!subDistrict ||
			!district ||
			!province ||
			!zipcode ||
			!mobile
	);

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
	disabled={{}}
/>
