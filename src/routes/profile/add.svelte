<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Input from '$lib/components/ui/input/index.svelte';
	import { form$, setDisabledContinueBtn } from './store/store';
	import DatePicker from '$lib/components/ui/datepicker';

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

	function onKeydown() {
		setDisabledContinueBtn(
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
				!!mobile
		);
	}
</script>

<svelte:head>
	<title>{$_('profile_add_title')}</title>
</svelte:head>

<div class="text-3xl pb-2">
	{$_('profile_add_title')}
</div>
<Input
	class="pb-2"
	label="profile_id_information"
	disabled={true}
	bind:value={id}
	on:keydown={() => onKeydown()}
/>
<Input
	class="pb-2"
	label="profile_first_name_information"
	bind:value={firstName}
	on:keydown={() => onKeydown()}
/>
<Input
	class="pb-2"
	label="profile_last_name_information"
	bind:value={lastName}
	on:keydown={() => onKeydown()}
/>
<DatePicker
	classes="pb-2"
	placeholder="profile_dob_information"
	disabled={true}
	bind:value={dob}
	on:keydown={() => onKeydown()}
/>
<Input
	class="pb-2"
	label="profile_sex_information"
	bind:value={sex}
	on:keydown={() => onKeydown()}
/>
<Input
	class="pb-2"
	label="profile_address_information"
	bind:value={address}
	on:keydown={() => onKeydown()}
/>
<Input
	class="pb-2"
	label="profile_disbtrict_information"
	bind:value={subDistrict}
	on:keydown={() => onKeydown()}
/>
<Input
	class="pb-2"
	label="profile_sub_district_information"
	bind:value={district}
	on:keydown={() => onKeydown()}
/>
<Input
	class="pb-2"
	label="profile_province_information"
	bind:value={province}
	on:keydown={() => onKeydown()}
/>
<Input
	class="pb-2"
	label="profile_postcode_information"
	bind:value={postcode}
	on:keydown={() => onKeydown()}
/>
<Input
	class="pb-2"
	label="profile_mobile_information"
	bind:value={mobile}
	on:keydown={() => onKeydown()}
/>
