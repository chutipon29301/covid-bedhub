<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Input from '$lib/components/ui/input/index.svelte';
	import Button from '$lib/components/ui/button/index.svelte';

	let identification: string,
		name = 'name surname',
		appointmentDate = '10-2-2021',
		hospital = 'ABC';
</script>

<svelte:head>
	<title>{$_('healthcare_staff_title')}</title>
</svelte:head>

<div class="pb-8">
	<div class="flex justify-center text-3xl pb-4">{$_('healthcare_staff_title')}</div>
	<Input class="pb-4" bind:value={identification} label={$_('patient_id_information')} />
	<div class="flex justify-center">
		<Button class="px-16" placeholder={$_('check_button')} />
	</div>
</div>
<div class="flex flex-col font-semibold">
	<p>
		{$_('edit_symptoms_name_label')}: {name}
	</p>
	<p>
		{$_('appointment_date_label')}: {appointmentDate}
	</p>
	<p>
		{$_('hospital_label')}: {hospital}
	</p>
</div>
<!-- <div class="flex flex-col">
	<div class="py-16 flex justify-center">
		{$_('hospital_label')}: {hospital}
	</div>
	<div class="bg-red-400 py-4 px-4 text-white flex justify-center -mx-6">
		{$_('wrong_hospital_inline_error')}
	</div>
</div> -->
<!-- <div class="flex justify-center text-red-500">{$_('not_found_identification_inline_error')}</div> -->
