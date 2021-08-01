<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';
	import Modal from '$lib/components/ui/modal/confirm/index.svelte';

	export let appointmentDate: string;
	export let name: string;
	export let sex: string;
	export let age: number;
	export let identification: string;
	export let mobile: string;
	export let notes: string;
	export let heading: string;
	export let confirmBtn: string;

	const dispatch = createEventDispatcher();
</script>

<Modal
	{heading}
	{confirmBtn}
	cancelBtn={$_('close_label')}
	on:confirm={() => dispatch('confirm')}
	on:cancel={() => dispatch('close')}
>
	<div class="px-2 relative border rounded-lg focus-within:border-indigo-500">
		<input
			bind:value={appointmentDate}
			type="date"
			class="p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
		/>
	</div>
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
