<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { setDisabledContinueBtn, vaccine$ } from './store/store';
	import Input from '$lib/components/ui/input/index.svelte';
	import DatePicker from '$lib/components/ui/datepicker';

	let {
		examReceiveDate,
		examLocation,
		examDate,
		vaccinesInfo1,
		vaccinesInfo2,
		vaccinesInfo3
	} = $vaccine$;

	setDisabledContinueBtn(false);
</script>

<svelte:head>
	<title>{$_('home_ticket_title')}</title>
</svelte:head>

<DatePicker classes="mb-2" placeholder="profile_dob_information" bind:value={examReceiveDate} />
<Input class="pb-2" label="profile_id_information" bind:value={examLocation} />
<DatePicker classes="mb-2" placeholder="profile_dob_information" bind:value={examReceiveDate} />
<DatePicker classes="mb-2" placeholder="profile_dob_information" bind:value={examDate} />
<Input class="pb-2" label="profile_id_information" bind:value={vaccinesInfo1.vaccine} />
<DatePicker classes="mb-2" placeholder="profile_dob_information" bind:value={vaccinesInfo1.date} />
<Input class="pb-2" label="profile_id_information" bind:value={vaccinesInfo2.vaccine} />
<DatePicker classes="mb-2" placeholder="profile_dob_information" bind:value={vaccinesInfo2.date} />
<Input class="pb-2" label="profile_id_information" bind:value={vaccinesInfo3.vaccine} />
<DatePicker classes="mb-2" placeholder="profile_dob_information" bind:value={vaccinesInfo3.date} />
