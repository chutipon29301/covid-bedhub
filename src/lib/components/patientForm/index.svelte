<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Input from '$lib/components/ui/input/index.svelte';
	import DatePicker from '$lib/components/ui/datepicker';

	export let id: string,
		firstName: string,
		lastName: string,
		dob: Date,
		sex: string,
		address: string,
		subDistrict: string,
		district: string,
		province: string,
		zipcode: string,
		mobile: string,
		disabled: {
			id?: boolean;
			firstName?: boolean;
			lastName?: boolean;
			dob?: boolean;
			sex?: boolean;
			address?: boolean;
			subDistrict?: boolean;
			district?: boolean;
			province?: boolean;
			zipcode?: boolean;
			mobile?: boolean;
		};

	function verifyFields() {
		console.log('typing');
	}
</script>

<div class="text-3xl pb-2">
	{$_('profile_add_title')}
</div>
<Input
	class="pb-2"
	label="profile_id_information"
	disabled={disabled?.id}
	bind:value={id}
	on:keyup={() => verifyFields()}
/>
<Input
	class="pb-2"
	label="profile_first_name_information"
	disabled={disabled?.firstName}
	bind:value={firstName}
	on:keyup={() => verifyFields()}
/>
<Input
	class="pb-2"
	label="profile_last_name_information"
	disabled={disabled?.lastName}
	bind:value={lastName}
	on:keyup={() => verifyFields()}
/>
<DatePicker
	placeholder="profile_dob_information"
	disabled={disabled?.dob}
	bind:value={dob}
	on:keyup={() => verifyFields()}
/>
<Input
	class="py-2"
	label="profile_sex_information"
	disabled={disabled?.sex}
	bind:value={sex}
	on:keyup={() => verifyFields()}
/>
<Input
	class="pb-2"
	label="profile_address_information"
	disabled={disabled?.address}
	bind:value={address}
	on:keyup={() => verifyFields()}
/>
<Input
	class="pb-2"
	label="profile_disbtrict_information"
	disabled={disabled?.subDistrict}
	bind:value={subDistrict}
	on:keyup={() => verifyFields()}
/>
<Input
	class="pb-2"
	label="profile_sub_district_information"
	disabled={disabled?.district}
	bind:value={district}
	on:keyup={() => verifyFields()}
/>
<Input
	class="pb-2"
	label="profile_province_information"
	disabled={disabled?.province}
	bind:value={province}
	on:keyup={() => verifyFields()}
/>
<Input
	class="pb-2"
	label="profile_postcode_information"
	disabled={disabled?.zipcode}
	bind:value={zipcode}
	on:keyup={() => verifyFields()}
/>
<Input
	class="pb-2"
	label="profile_mobile_information"
	disabled={disabled?.mobile}
	bind:value={mobile}
	on:keyup={() => verifyFields()}
/>
