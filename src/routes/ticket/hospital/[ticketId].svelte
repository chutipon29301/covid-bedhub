<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export async function load({ page }: LoadInput): Promise<LoadOutput> {
		let ticketId = page.params.ticketId;
		return { props: { ticketId } };
	}
</script>

<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { CheckHospital } from '$lib/generated/graphql';
	import { setIsLoading } from '$lib/store';
	import { onMount } from 'svelte';
	import { TICKET_STATUS_LABEL } from '$lib/constants/constant';

	let name: string,
		id: string,
		mobile: string,
		status: string,
		hospitalName: string,
		hospitalAddress: string,
		hospitalTel: string;

	onMount(() => loadTicketInfo());

	function loadTicketInfo() {
		const response = CheckHospital({ variables: { id: $page.params.ticketId } });
		response.subscribe(({ data, loading }) => {
			setIsLoading(loading);
			name = data?.myTicket?.patient.firstName;
			id = data?.myTicket?.patient.identification;
			mobile = data?.myTicket?.patient.tel;
			status = data?.myTicket?.status;
			hospitalName = data?.myTicket?.hospital?.name;
			hospitalAddress = data?.myTicket?.hospital?.subDistrict;
			hospitalTel = data?.myTicket?.hospital?.tel;
		});
	}
</script>

<svelte:head>
	<title>{$_('hospital_information_label')}</title>
</svelte:head>

<div class="flex flex-col">
	<div class="pb-4">
		<div class="text-3xl pb-4">{$_('hospital_information_label')}</div>
		{#if hospitalName}
			<div>
				<p class="pb-2">{$_('edit_symptoms_name_label')}: {name}</p>
				<p class="pb-2">{$_('patient_id_information')}: {id}</p>
				<p class="pb-2">{$_('patient_mobile_information')}: {mobile}</p>
				<p class="pb-2">{$_('edit_symptoms_status_label')}: {TICKET_STATUS_LABEL[status]}</p>
				<p class="pb-2">{$_('hospital_received_label')}: {hospitalName}</p>
				<p class="pb-2">{$_('hospital_address_label')}: {hospitalAddress}</p>
				<p class="pb-2">{$_('hospital_tel_label')}: {hospitalTel}</p>
			</div>
		{:else}
			<div class="flex justify-center py-8">
				{$_('no_information_label')}
			</div>
		{/if}
	</div>
</div>
