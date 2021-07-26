<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { RequestedTicket } from '$lib/generated/graphql';
	import { setIsLoading } from '$lib/store';
	import { onMount } from 'svelte';
	import { Headers } from './models';
	import RequestTable from '$lib/components/requestTable/index.svelte';
	import Card from '$lib/components/ui/card/detailed/index.svelte';
	import Button from '$lib/components/ui/button/index.svelte';

	let headers = Headers,
		content = [],
		selectedTicket = null,
		noOfPages = 0,
		skip = 0,
		currentPage = 0,
		defaultPageSize = 10,
		totalItems = 0;

	onMount(() => {
		loadTickets();
	});

	function loadTickets() {
		const response = RequestedTicket({ variables: { data: { skip } } });
		const sub = response.subscribe(({ data, loading }) => {
			setIsLoading(loading);
			content =
				data?.requestedTicket.tickets.map((t) => ({
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
			totalItems = data?.requestedTicket.count;
			noOfPages = data?.requestedTicket.count / defaultPageSize;
			if (!loading) sub();
		});
	}

	function goNext() {
		if (currentPage > noOfPages - 2) return;
		skip += defaultPageSize;
		currentPage++;
		loadTickets();
	}

	function goPrev() {
		if (!currentPage) return;
		skip -= defaultPageSize;
		currentPage--;
		loadTickets();
	}
</script>

<svelte:head>
	<title>{$_('home_title')}</title>
</svelte:head>

<div class="w-full flex xl:flex-row gap-4 flex-col">
	<RequestTable
		on:rowClick={(v) => (selectedTicket = v.detail)}
		on:goNext={goNext}
		on:goPrev={goPrev}
		{headers}
		{content}
		{noOfPages}
		{currentPage}
		{totalItems}
	/>
	{#if selectedTicket}
		<Card class="sticky top-20" title={$_('patient_information_label')} tag="very high">
			<span slot="title-detail">
				<div class="flex flex-col">
					<div class="text-sm font-semibold">24 Jan 2021</div>
					<div class="text-xs grid justify-items-end -mt-1">20:20:59</div>
				</div>
			</span>
			<span slot="content-1">asdfasdf</span>
			<span slot="content-2">asdfasdf</span>
			<span slot="content-3">asdfasdf</span>
			<span slot="footer" class="grid grid-cols-2 gap-2">
				<Button color="white-red" placeholder={$_('cancel_appointment_label')} />
				<Button color="white" placeholder={$_('change_appointment_label')} />
			</span>
		</Card>
	{:else}
		<div
			class="max-h-96 h-80 w-full border rounded-lg bg-gray-100 sticky top-20 flex justify-center items-center text-gray-700"
			style="min-width: 350px;"
		>
			{$_('no_information_label')}
		</div>
	{/if}
</div>
