<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Input from '$lib/components/ui/input/index.svelte';
	import DatePicker from '$lib/components/ui/datepicker';

	export let id: string,
		firstName: string,
		lastName: string,
		dob: Date,
		sex: string,
		mobile: string,
		disabled: {
			id?: boolean;
			firstName?: boolean;
			lastName?: boolean;
			dob?: boolean;
			sex?: boolean;
			mobile?: boolean;
		};

	function verifyFields() {
		console.log('typing');
	}
</script>

<Input
	class="pb-2"
	label={$_('patient_id_information')}
	disabled={disabled?.id}
	bind:value={id}
	on:keyup={() => verifyFields()}
/>
<Input
	class="pb-2"
	label={$_('patient_first_name_information')}
	disabled={disabled?.firstName}
	bind:value={firstName}
	on:keyup={() => verifyFields()}
/>
<Input
	class="pb-2"
	label={$_('patient_last_name_information')}
	disabled={disabled?.lastName}
	bind:value={lastName}
	on:keyup={() => verifyFields()}
/>
<DatePicker
	placeholder={$_('patient_dob_information')}
	disabled={disabled?.dob}
	bind:value={dob}
	on:keyup={() => verifyFields()}
/>
<Input
	class="py-2"
	label={$_('patient_sex_information')}
	disabled={disabled?.sex}
	bind:value={sex}
	on:keyup={() => verifyFields()}
/>
<Input
	class="pb-2"
	label={$_('patient_mobile_information')}
	disabled={disabled?.mobile}
	bind:value={mobile}
	on:keyup={() => verifyFields()}
/>
