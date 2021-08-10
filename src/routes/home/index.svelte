<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { faMinusCircle, faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { onMount } from 'svelte';
	import { CancelTicket, MyTickets } from '$lib/generated/graphql';
	import { setIsLoading } from '$lib/store';
	import { TICKET_STATUS } from '$lib/constants/constant';
	import { EModalColorTone } from '$lib/components/ui/modal/model';
	import Fa from '$lib/components/ui/fa/index.svelte';
	import Ticket from '$lib/components/ui/ticket/index.svelte';
	import Modal from '$lib/components/ui/modal/dialog/index.svelte';
	import ProgressiveImg from '$lib/components/ui/progressiveImg/index.svelte';

	let tickets = [];
	let successPopupShown = false;
	let ticketId: string;
	let loaded = false;

	onMount(() => {
		loadMyTickets();
	});

	function loadMyTickets() {
		const response = MyTickets({});
		const unsub = response.subscribe(({ data, loading }) => {
			setIsLoading(loading);
			tickets =
				data?.me.tickets.map((t) => ({
					ticketId: t.id,
					name: `${t.patient.firstName} ${t.patient.lastName}`,
					id: t.patient.identification,
					status: t.status,
					appointmentDate: t.appointedDate,
					hospitalName: t.hospital?.name
				})) || [];
			loaded = !loading;
			if (!loading) unsub();
		});
	}

	function navigate() {
		goto(ROUTES.TICKET);
	}

	function handleButtonClick(id: string, status: string) {
		if (status === TICKET_STATUS.REQUEST) {
			cancelTicket(id);
			return;
		}
		goto(`${ROUTES.TICKET_HOSPITAL}/${id}`);
	}

	async function cancelTicket(id: string) {
		if (!confirm('ยืนยันการยกเลิก')) return;
		setIsLoading(true);
		const { data } = await CancelTicket({ variables: { id } });
		setIsLoading(false);
		if (data) {
			successPopupShown = true;
			ticketId = data.cancelTicket.id;
		}
	}

	function onClickOkPopup() {
		successPopupShown = false;
		loadMyTickets();
	}

	function onClickEdit(id: string) {
		goto(`${ROUTES.TICKET_SYMPTOM}/${id}`);
	}
</script>

<svelte:head>
	<title>{$_('home_web_title')}</title>
</svelte:head>

{#if successPopupShown}
	<Modal
		icon={faMinusCircle}
		heading={$_('cancel_request_success_label')}
		confirmBtn={'OK'}
		colorTone={EModalColorTone.RED}
		on:confirm={onClickOkPopup}
	/>
{/if}
{#if loaded}
	<div class="flex flex-col min-h-content mx-auto">
		<div class="flex">
			<div class="flex flex-grow text-3xl">{$_('home_title')}</div>
			<!-- {#if tickets.length}
				<div on:click={() => navigate()}>
					<Fa class="cursor-pointer" icon={faPlusCircle} size="2rem" />
				</div>
			{/if} -->
		</div>
		{#if tickets.length !== 0}
			<div class="flex flex-grow flex-col items-center justify-center">
				<div class="text-center text-lg">
					{$_('not_accept_ticket')}
				</div>
				<div class="text-center pt-4 text-sm text-gray-600">
					{$_('not_accept_ticket_detail')}
				</div>
				<!-- <div
					class="border border-indigo-300 px-16 sm:px-24 py-12 cursor-pointer rounded-lg shadow-md"
					on:click={() => navigate()}
				>
					<ProgressiveImg
						class="pb-4"
						aspectRatio="1/1"
						width="96px"
						height="96px"
						src="/button/online-reservation_progressive.png"
						dataSrc="/button/online-reservation.png"
						alt="BookingBtn"
					/>
					<div class="flex items-center text-lg">
						<Fa class="pr-2" icon={faSearch} />{$_('find_bed_button')}
					</div>
				</div> -->
			</div>
		{:else}
			{#if tickets.filter((t) => t.status === TICKET_STATUS.REQUEST || t.status === TICKET_STATUS.MATCH).length === 0}
				<div class="flex justify-center pt-8 text-lg">{$_('no_information_label')}</div>
			{/if}
			{#each tickets.filter((t) => t.status === TICKET_STATUS.REQUEST || t.status === TICKET_STATUS.MATCH) as ticket}
				<div class="pt-4">
					<Ticket
						name={ticket.name}
						id={ticket.id}
						status={ticket.status}
						appointmentDate={ticket?.appointmentDate}
						hospitalName={ticket?.hospitalName}
						on:clickButton={(v) => handleButtonClick(ticket.ticketId, v.detail)}
						on:clickEdit={() => onClickEdit(ticket.ticketId)}
					/>
				</div>
			{/each}
			<div class="text-3xl pt-8">{$_('home_history_title')}</div>
			{#if tickets.filter((t) => t.status === TICKET_STATUS.HOSPITAL_CANCEL || t.status === TICKET_STATUS.PATIENT_CANCEL).length === 0}
				<div class="flex justify-center py-8 text-lg">{$_('no_information_label')}</div>
			{/if}
			{#each tickets.filter((t) => t.status === 'HOSPITAL_CANCEL' || t.status === 'PATIENT_CANCEL') as ticket}
				<div class="pt-4">
					<Ticket
						name={ticket.name}
						id={ticket.id}
						status={ticket.status}
						appointmentDate={ticket?.appointmentDate}
						hospitalName={ticket?.hospitalName}
					/>
				</div>
			{/each}
		{/if}
	</div>
{/if}

<style>
	.min-h-content {
		min-height: calc(100vh - 22rem);
	}
</style>
