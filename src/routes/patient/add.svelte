<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { form$, setDisabledContinueBtn, setForm } from './store/store';
	import { onDestroy } from 'svelte';
	import ProfileForm from '$lib/components/profileForm/index.svelte';

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
		postcode,
		mobile
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
		!!postcode &&
		!!mobile;

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
			postcode,
			mobile
		});
	});
</script>

<svelte:head>
	<title>{$_('profile_add_title')}</title>
</svelte:head>

<ProfileForm
	bind:id
	bind:firstName
	bind:lastName
	bind:dob
	bind:sex
	bind:address
	bind:subDistrict
	bind:district
	bind:province
	bind:postcode
	bind:mobile
	disabled={{ id: true, dob: true }}
/>
