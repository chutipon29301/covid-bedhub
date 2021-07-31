<script lang="ts">
	import { _ } from 'svelte-i18n';
	import {
		AcceptTicket,
		requestedRiskCount,
		RequestedTicket,
		RequestedTickets
	} from '$lib/generated/graphql';
	import { setIsLoading } from '$lib/store';
	import { onMount } from 'svelte';
	import { Headers } from './models';
	import { dateToStringFormat, illnessToChecklist, symptomToChecklist } from '$lib/util';
	import { setRefresh } from './store/store';
	import type { PatientDetail } from '$lib/models';
	import QueueTable from '$lib/components/queueTable/index.svelte';
	import PatientCard from '$lib/components/patientCard/index.svelte';
	import Button from '$lib/components/ui/button/index.svelte';
	import AppointmentModal from '$lib/components/appointmentModal/index.svelte';
	import { TICKET_STATUS_LABEL } from '$lib/constants/constant';

	let headers = Headers.map((v) => ({ ...v, label: $_(v.label) })),
		content = [],
		selectedTicket: PatientDetail,
		skip = 0,
		totalItems = 0,
		filterAmount: number[] = [],
		riskLevel = null,
		acceptTicketModalShown = false,
		notes = '',
		datepickerError: string;

	onMount(() => {
		getRiskCount();
		loadTickets();
	});

	function loadTickets() {
		const response = RequestedTickets({ variables: { data: { skip, riskLevel } } });
		const unsub = response.subscribe(({ data, loading }) => {
			setIsLoading(loading);
			content =
				data?.requestedTickets.tickets.map((t) => ({
					createdAt: [
						new Date(t.createdAt).toDateString(),
						new Date(t.createdAt).toLocaleTimeString()
					],
					name: `${t.patient.firstName} ${t.patient.lastName}`,
					sex: t.patient.sex,
					age: t.patient.age,
					riskLevel: t.riskLevel,
					status: TICKET_STATUS_LABEL[t.status],
					id: t.id
				})) || [];
			totalItems = data?.requestedTickets.count;
			if (!loading) unsub();
		});
	}

	async function getTicket(id: string) {
		const response = RequestedTicket({ variables: { id } });
		const unsub = response.subscribe(({ data, loading }) => {
			setIsLoading(loading);
			if (data) {
				const vaccines = data.requestedTicket.vaccines;
				selectedTicket = {
					id: +data.requestedTicket.id,
					name: `${data.requestedTicket.patient.firstName} ${data.requestedTicket.patient.lastName}`,
					sex: data.requestedTicket.patient.sex,
					age: data.requestedTicket.patient.age,
					identification: data.requestedTicket.patient.identification,
					mobile: data.requestedTicket.patient.tel,
					createdAt: new Date(data.requestedTicket.createdAt),
					examDate: data.requestedTicket.examDate,
					examLocation: data.requestedTicket.examLocation,
					examReceiveDate: data.requestedTicket.examReceiveDate,
					vaccines: vaccines
						.sort((a, b) => a.doseNumber - b.doseNumber)
						.map((v) => ({ name: v.vaccineName, dateReceived: new Date(v.vaccineReceiveDate) })),
					riskLevel: data.requestedTicket.riskLevel,
					symptops: symptomToChecklist(data.requestedTicket.symptoms),
					illnesses: illnessToChecklist(data.requestedTicket.patient.illnesses)
				};
			}
			if (!loading) unsub();
		});
	}

	function getRiskCount(fetchPolicy: 'cache-first' | 'network-only' = 'cache-first') {
		const response = requestedRiskCount({ fetchPolicy });
		const unsub = response.subscribe(({ data, loading }) => {
			setIsLoading(loading);
			if (data) {
				filterAmount = [
					data.requestedTicketByRiskLevelCount.find((v) => v.riskLevel === 4)?.count || 0,
					data.requestedTicketByRiskLevelCount.find((v) => v.riskLevel === 3)?.count || 0,
					data.requestedTicketByRiskLevelCount.find((v) => v.riskLevel === 2)?.count || 0,
					data.requestedTicketByRiskLevelCount.find((v) => v.riskLevel === 1)?.count || 0
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

	async function handleButtonClick(action: 'accept' | 'deny') {
		let success = false;
		if (action === 'accept') success = await acceptTicket(selectedTicket.id);
		if (action === 'deny') success = true;
		if (!success) return;
		getRiskCount('network-only');
		setRefresh(true);
		selectedTicket = null;
		acceptTicketModalShown = false;
		loadTickets();
		setRefresh(false);
	}

	async function acceptTicket(id: number): Promise<boolean> {
		if (!selectedTicket.appointmentDate) {
			datepickerError = 'Please select appointment date.';
			alert(datepickerError);
			return false;
		}
		datepickerError = null;
		setIsLoading(true);
		await AcceptTicket({
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
</script>

<svelte:head>
	<title>{$_('home_title')}</title>
</svelte:head>

{#if acceptTicketModalShown}
	<AppointmentModal
		heading={$_('set_appointment_date_label')}
		confirmBtn={$_('confirm_accept_request_label')}
		bind:appointmentDate={selectedTicket.appointmentDate}
		bind:notes
		name={selectedTicket.name}
		sex={selectedTicket.sex}
		age={selectedTicket.age}
		identification={selectedTicket.identification}
		mobile={selectedTicket.mobile}
		on:close={() => (acceptTicketModalShown = false)}
		on:confirm={() => handleButtonClick('accept')}
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
	<PatientCard class="sticky top-10" {selectedTicket}>
		<span class="grid gap-2">
			<Button on:click={() => (acceptTicketModalShown = true)} placeholder={$_('accept_request')} />
		</span>
	</PatientCard>
</div>
