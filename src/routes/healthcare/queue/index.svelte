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
	import type { PatientDetail } from '$lib/models';
	import QueueTable from '$lib/components/queueTable/index.svelte';
	import PatientCard from '$lib/components/patientCard/index.svelte';
	import Button from '$lib/components/ui/button/index.svelte';
	import AppointmentModal from '$lib/components/appointmentModal/index.svelte';

	let headers = Headers.map((v) => ({ ...v, label: $_(v.label) })),
		content = [],
		selectedTicket: PatientDetail,
		skip = 0,
		totalItems = 0,
		filterAmount: number[] = [],
		riskLevel = null,
		acceptTicketModalShown = false,
		appointmentDate: Date,
		notes = '';

	onMount(() => {
		getRiskCount();
		loadTickets();
	});

	function loadTickets() {
		const response = RequestedTickets({ variables: { data: { skip, riskLevel } } });
		const sub = response.subscribe(({ data, loading }) => {
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
					status: t.status,
					id: t.id
				})) || [];
			totalItems = data?.requestedTickets.count;
			if (!loading) sub();
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

	function getRiskCount() {
		const response = requestedRiskCount({ fetchPolicy: 'cache-first' });
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

	function handleButtonClick(action: 'accept' | 'deny') {
		if (action === 'accept') acceptTicket(selectedTicket.id);
		if (action === 'deny') denyTicket(selectedTicket.id);
		selectedTicket = null;
		acceptTicketModalShown = false;
		loadTickets();
	}

	async function acceptTicket(id: number) {
		setIsLoading(true);
		await AcceptTicket({
			variables: {
				data: { id: id.toString(), appointedDate: dateToStringFormat(appointmentDate), notes }
			}
		});
		setIsLoading(false);
	}

	function denyTicket(id: number) {
		console.log(id);
	}
</script>

<svelte:head>
	<title>{$_('home_title')}</title>
</svelte:head>

{#if acceptTicketModalShown}
	<AppointmentModal
		{appointmentDate}
		name={selectedTicket.name}
		sex={selectedTicket.sex}
		age={selectedTicket.age}
		identification={selectedTicket.identification}
		mobile={selectedTicket.mobile}
		{notes}
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
		<span class="grid grid-cols-2 gap-2">
			<Button
				on:click={() => handleButtonClick('deny')}
				color="red"
				placeholder={$_('deny_request')}
			/>
			<Button on:click={() => (acceptTicketModalShown = true)} placeholder={$_('accept_request')} />
		</span>
	</PatientCard>
</div>
