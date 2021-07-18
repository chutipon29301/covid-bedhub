<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { faBed, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { onMount } from 'svelte';
	import { MyTickets } from '$lib/generated/graphql';
	import { setIsLoading, setLocation } from '$lib/store';
	import { variables } from '$lib/constants/environment';
	import Button from '$lib/components/ui/button/index.svelte';
	import Fa from '$lib/components/ui/fa/index.svelte';
	import Ticket from '$lib/components/ui/ticket/index.svelte';

	let disableFindBed = false;
	let tickets = [];

	$: response = MyTickets({ errorPolicy: 'all' });

	onMount(async () => {
		setGPS();
		response.subscribe(({ data, loading }) => {
			setIsLoading(loading);
			tickets =
				data?.me.tickets.map((t) => ({
					name: `${t.patient.firstName} ${t.patient.lastName}`,
					id: t.patient.identification,
					status: t.status,
					appointmentDate: t.appointedDate,
					hospitalName: t.hospital?.name
				})) || [];
			// inactiveTickets =
			// 	data?.me.tickets
			// 		.map((t) => ({
			// 			name: `${t.patient.firstName} ${t.patient.lastName}`,
			// 			id: t.patient.identification,
			// 			status: t.status,
			// 			appointmentDate: t.appointedDate,
			// 			hospitalName: t.hospital?.name
			// 		}))
			// 		.filter((t) => t.status === 'HOSPITAL_CANCEL' || t.status === 'PATIENT_CANCEL') || [];
		});
	});

	function setGPS() {
		if (variables.dev) {
			setLocation({ lat: 0, lng: 0 });
			return;
		}

		if (navigator.geolocation)
			navigator.geolocation.getCurrentPosition(
				(position) =>
					setLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
				() => (disableFindBed = true)
			);
		else alert("This website doesn't support this browser");
	}

	function navigate() {
		if (disableFindBed) {
			alert('Please allow the gps');
			return;
		}
		goto(ROUTES.TICKET);
	}
</script>

<svelte:head>
	<title>{$_('home_title')}</title>
</svelte:head>

<div class="flex flex-col min-h-content mx-auto">
	<div class="flex">
		<div class="flex flex-grow text-3xl">{$_('home_title')}</div>
		{#if tickets.length}
			<div on:click={() => navigate()}>
				<Fa class="cursor-pointer" icon={faPlusCircle} size="2rem" />
			</div>
		{/if}
	</div>
	{#if tickets.length === 0}
		<div class="flex flex-grow flex-col items-center justify-center up-10">
			<Fa class="pb-2" icon={faBed} size="2rem" />
			<Button on:click={() => navigate()} placeholder="find_bed_button" />
		</div>
	{:else}
		{#each tickets.filter((t) => t.status === 'REQUEST' || t.status === 'MATCH') as ticket}
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
		<div class="text-3xl pt-8">{$_('home_history_title')}</div>
		{#if tickets.filter((t) => t.status === 'HOSPITAL_CANCEL' || t.status === 'PATIENT_CANCEL').length === 0}
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
					on:clickButton={() => {}}
					on:clickEdit={() => {}}
				/>
			</div>
		{/each}
	{/if}
</div>

<style>
	.min-h-content {
		min-height: calc(100vh - 10rem);
	}
	.up-10 {
		transform: translateY(-10%);
	}
</style>
