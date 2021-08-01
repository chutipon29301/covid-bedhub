<script lang="ts">
	import { _ } from 'svelte-i18n';
	import {
		acceptedRiskCount,
		AcceptedTicket,
		AcceptedTickets,
		CancelAppointment,
		EditAppointment
	} from '$lib/generated/graphql';
	import { setIsLoading } from '$lib/store';
	import { onMount } from 'svelte';
	import { Headers } from './models';
	import { dateToStringFormat, illnessToChecklist, symptomToChecklist } from '$lib/util';
	import type { PatientDetail } from '$lib/models';
	import QueueTable from '$lib/components/queueTable/index.svelte';
	import PatientCard from '$lib/components/patientCard/index.svelte';
	import Button from '$lib/components/ui/button/index.svelte';
	import AppointmentModal from '$lib/components/appointmentModal/index.svelte';
	import Modal from '$lib/components/ui/modal/confirm/index.svelte';
	import { TICKET_STATUS_LABEL } from '$lib/constants/constant';

	let headers = [
			...Headers,
			{ field: 'appointmentDate', label: 'appointment_date_label' }
		].map((v) => ({ ...v, label: $_(v.label) })),
		content = [],
		selectedTicket: PatientDetail = null,
		skip = 0,
		totalItems = 0,
		filterAmount: number[] = [],
		riskLevel = null,
		editTicketModalShown = false,
		cancelTicketModalShown = false,
		notes = '',
		datepickerError: string;

	onMount(() => {
		getRiskCount();
		loadTickets();
	});

	function loadTickets() {
		const response = AcceptedTickets({ variables: { data: { skip, riskLevel } } });
		const unsub = response.subscribe(({ data, loading }) => {
			setIsLoading(loading);
			content =
				data?.acceptedTickets.tickets.map((t) => ({
					createdAt: [
						new Date(t.createdAt).toDateString(),
						new Date(t.createdAt).toLocaleTimeString()
					],
					name: `${t.patient.firstName} ${t.patient.lastName}`,
					sex: t.patient.sex,
					age: t.patient.age,
					riskLevel: t.riskLevel,
					status: $_(TICKET_STATUS_LABEL[t.status]),
					id: t.id,
					appointmentDate: new Date(t.appointedDate).toDateString()
				})) || [];
			totalItems = data?.acceptedTickets.count;
			if (!loading) unsub();
		});
	}

	async function getTicket(id: string) {
		const response = AcceptedTicket({ variables: { id } });
		const unsub = response.subscribe(({ data, loading }) => {
			setIsLoading(loading);
			if (data) {
				const vaccines = data.acceptedTicket.vaccines;
				selectedTicket = {
					id: +data.acceptedTicket.id,
					name: `${data.acceptedTicket.patient.firstName} ${data.acceptedTicket.patient.lastName}`,
					sex: data.acceptedTicket.patient.sex,
					age: data.acceptedTicket.patient.age,
					identification: data.acceptedTicket.patient.identification,
					mobile: data.acceptedTicket.patient.tel,
					createdAt: new Date(data.acceptedTicket.createdAt),
					examDate: data.acceptedTicket.examDate,
					examLocation: data.acceptedTicket.examLocation,
					examReceiveDate: data.acceptedTicket.examReceiveDate,
					vaccines: vaccines
						.sort((a, b) => a.doseNumber - b.doseNumber)
						.map((v) => ({ name: v.vaccineName, dateReceived: new Date(v.vaccineReceiveDate) })),
					riskLevel: data.acceptedTicket.riskLevel,
					symptoms: symptomToChecklist(data.acceptedTicket.symptoms),
					illnesses: illnessToChecklist(data.acceptedTicket.patient.illnesses),
					appointmentDate: data.acceptedTicket.appointedDate
						? new Date(data.acceptedTicket.appointedDate)
						: null
				};
				notes = data.acceptedTicket.notes;
			}
			if (!loading) unsub();
		});
	}

	function getRiskCount(fetchPolicy: 'cache-first' | 'network-only' = 'cache-first') {
		const response = acceptedRiskCount({ fetchPolicy });
		const unsub = response.subscribe(({ data, loading }) => {
			setIsLoading(loading);
			if (data) {
				filterAmount = [
					data.acceptedTicketByRiskLevelCount.find((v) => v.riskLevel === 4)?.count || 0,
					data.acceptedTicketByRiskLevelCount.find((v) => v.riskLevel === 3)?.count || 0,
					data.acceptedTicketByRiskLevelCount.find((v) => v.riskLevel === 2)?.count || 0,
					data.acceptedTicketByRiskLevelCount.find((v) => v.riskLevel === 1)?.count || 0
				];
			}
			if (!loading) unsub();
		});
	}

	function handlePagination(defaultPageSize: number) {
		skip += defaultPageSize;
		loadTickets();
	}

	function handleFilter(level: number) {
		riskLevel = level || null;
		skip = 0;
		loadTickets();
	}

	function handleRefresh() {
		riskLevel = null;
		skip = 0;
		loadTickets();
	}

	async function handleButtonClick(action: 'edit' | 'cancel') {
		let success = false;
		if (action === 'edit') success = await editTicket(selectedTicket.id);
		if (action === 'cancel') success = await cancelTicket(selectedTicket.id);
		if (!success) return;
		getRiskCount('network-only');
		selectedTicket = null;
		editTicketModalShown = false;
		cancelTicketModalShown = false;
		loadTickets();
	}

	async function editTicket(id: number): Promise<boolean> {
		if (!selectedTicket.appointmentDate) {
			datepickerError = 'Please select appointment date.';
			alert(datepickerError);
			return false;
		}
		datepickerError = null;
		setIsLoading(true);
		await EditAppointment({
			variables: {
				data: {
					id: id.toString(),
					appointedDate: dateToStringFormat(selectedTicket.appointmentDate),
					notes
				}
			}
		});
		setIsLoading(false);
		return true;
	}

	async function cancelTicket(id: number): Promise<boolean> {
		setIsLoading(true);
		await CancelAppointment({ variables: { id: id.toString() } });
		setIsLoading(false);
		return true;
	}
</script>

<svelte:head>
	<title>{$_('home_title')}</title>
</svelte:head>

{#if cancelTicketModalShown}
	<Modal
		heading="ยืนยันการปฎิเสธ"
		confirmBtn="ปฎิเสธการรับ"
		cancelBtn="ปิด"
		on:cancel={() => (cancelTicketModalShown = false)}
		on:confirm={() => handleButtonClick('cancel')}
	>
		<div class="text-sm">
			<p>{selectedTicket.name}</p>
			<p>{`${$_('sex_label')}: ${selectedTicket.sex}`}</p>
			<p>{`${$_('age_label')}: ${selectedTicket.age}`}</p>
			<p>{`${$_('patient_id_information')}: ${selectedTicket.identification}`}</p>
			<p>{`${$_('patient_mobile_information')}: ${selectedTicket.mobile}`}</p>
		</div>
	</Modal>
{/if}
{#if editTicketModalShown}
	<AppointmentModal
		heading={$_('edit_appointment_date')}
		confirmBtn={$_('confirm_edit_request_label')}
		bind:appointmentDate={selectedTicket.appointmentDate}
		name={selectedTicket.name}
		sex={selectedTicket.sex}
		age={selectedTicket.age}
		identification={selectedTicket.identification}
		mobile={selectedTicket.mobile}
		{notes}
		on:close={() => (editTicketModalShown = false)}
		on:confirm={() => handleButtonClick('edit')}
	/>
{/if}
<div class="w-full flex xl:flex-row gap-4 flex-col">
	<QueueTable
		on:rowClick={(v) => getTicket(v.detail)}
		on:pagination={(v) => handlePagination(v.detail)}
		on:filter={(v) => handleFilter(v.detail)}
		on:refresh={handleRefresh}
		{headers}
		{content}
		{totalItems}
		{filterAmount}
	/>
	<PatientCard class="sticky top-20" {selectedTicket}>
		<span class="grid grid-cols-2 gap-2">
			<Button
				on:click={() => (cancelTicketModalShown = true)}
				color="white-red"
				placeholder={$_('cancel_appointment_label')}
			/>
			<Button
				on:click={() => (editTicketModalShown = true)}
				color="white"
				placeholder={$_('change_appointment_label')}
			/>
		</span>
	</PatientCard>
</div>
