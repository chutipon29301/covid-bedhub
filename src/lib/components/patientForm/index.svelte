<script lang="ts">
	import { _ } from 'svelte-i18n';
	import {
		noFutureValidation,
		identificationValidation,
		mobileNumberValidation,
		nameValidation
	} from '$lib/util';
	import type { Gender } from '$lib/generated/graphql';
	import Input from '$lib/components/ui/input/index.svelte';
	import DatePicker from '$lib/components/ui/datepicker';
	import Dropdown from '$lib/components/ui/dropdown/index.svelte';

	export let id: string,
		firstName: string,
		lastName: string,
		dob: Date,
		sex: Gender,
		mobile: string,
		disabled: {
			id?: boolean;
			firstName?: boolean;
			lastName?: boolean;
			dob?: boolean;
			sex?: boolean;
			mobile?: boolean;
		};
</script>

<Input
	required={true}
	class="pb-2"
	label={$_('patient_id_information')}
	disabled={disabled?.id}
	bind:value={id}
	errorMessage={identificationValidation(id)
		? ''
		: $_('validation_inline_error', { values: { field: $_('patient_id_information') } })}
/>
<Input
	required={true}
	class="pb-2"
	label={$_('patient_first_name_information')}
	disabled={disabled?.firstName}
	bind:value={firstName}
	errorMessage={nameValidation(firstName)
		? ''
		: $_('validation_inline_error', { values: { field: $_('patient_first_name_information') } })}
/>
<Input
	required={true}
	class="pb-2"
	label={$_('patient_last_name_information')}
	disabled={disabled?.lastName}
	bind:value={lastName}
	errorMessage={nameValidation(lastName)
		? ''
		: $_('validation_inline_error', { values: { field: $_('patient_last_name_information') } })}
/>
<DatePicker
	required={true}
	placeholder={$_('patient_dob_information')}
	disabled={disabled?.dob}
	bind:value={dob}
	errorMessage={noFutureValidation(dob)
		? ''
		: $_('validation_inline_error', { values: { field: $_('patient_dob_information') } })}
/>
<Dropdown
	required={true}
	class="pb-2 pt-4"
	label={$_('patient_sex_information')}
	bind:value={sex}
	list={[
		{ label: $_('male_label'), value: 'MALE' },
		{ label: $_('female_label'), value: 'FEMALE' }
	]}
/>
<Input
	required={true}
	type="number"
	class="pb-2"
	label={$_('patient_mobile_information')}
	disabled={disabled?.mobile}
	bind:value={mobile}
	errorMessage={mobileNumberValidation(mobile)
		? ''
		: $_('validation_inline_error', { values: { field: $_('patient_mobile_information') } })}
/>
