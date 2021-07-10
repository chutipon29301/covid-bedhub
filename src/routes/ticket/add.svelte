<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { setDisabledContinueBtn, setForm } from './store/store';
	import { userProfile$ } from '$lib/store';
	import { initProfile } from './store/models';
	import { onDestroy } from 'svelte';
	import ProfileForm from '$lib/components/profileForm/index.svelte';

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
		postcode,
		mobile
	} = !forOther ? $userProfile$ : initProfile;

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
			!postcode ||
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
	disabled={{}}
/>
