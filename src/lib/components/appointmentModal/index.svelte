<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';
	import Modal from '$lib/components/ui/modal/confirm/index.svelte';
	import DatePicker from '$lib/components/ui/datepicker';

	export let appointmentDate: Date;
	export let name: string;
	export let sex: string;
	export let age: number;
	export let identification: string;
	export let mobile: string;
	export let notes: string;

	const dispatch = createEventDispatcher();
</script>

<Modal
	heading="กำหนดวันเข้ารับการรักษา"
	confirmBtn="ยืนยันการรับ"
	cancelBtn="ปิด"
	on:confirm={() => dispatch('confirm')}
	on:cancel={() => dispatch('close')}
>
	<DatePicker
		placeholder={$_('select_appointment_date_label')}
		bind:value={appointmentDate}
		years_map={[new Date().getFullYear(), new Date().getFullYear() + 1]}
	/>
	<div class="text-sm py-4">
		<p>{name}</p>
		<p>{`${$_('sex_label')}: ${sex}`}</p>
		<p>{`${$_('age_label')}: ${age}`}</p>
		<p>{`${$_('patient_id_information')}: ${identification}`}</p>
		<p>{`${$_('patient_mobile_information')}: ${mobile}`}</p>
	</div>
	<div>
		{$_('message_label')}
		<textarea
			bind:value={notes}
			placeholder="เขียนข้อความที่นี้"
			class="border rounded-sm border-indigo-200 w-full p-4"
			cols="40"
			rows="5"
			maxlength="250"
		/>
	</div>
</Modal>
