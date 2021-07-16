<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { faBed, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import Button from '$lib/components/ui/button/index.svelte';
	import Fa from '$lib/components/ui/fa/index.svelte';
	import Ticket from '$lib/components/ui/ticket/index.svelte';
	import { onMount } from 'svelte';
	import { MyTickets } from '$lib/generated/graphql';
	import { setIsLoading } from '$lib/store';

	let disableFindBed = false;

	$: response = MyTickets({});
	$: setIsLoading($response.loading);
	$: tickets =
		$response.data?.me.tickets.map((t) => ({
			name: `${t.patient.firstName} ${t.patient.lastName}`,
			id: t.patient.identification,
			status: t.status,
			appointmentDate: t.appointedDate,
			hospitalName: t.hospital?.name
		})) || [];

	onMount(async () => {
		if (navigator.geolocation)
			navigator.geolocation.getCurrentPosition(showPosition, () => (disableFindBed = true));
		else alert("This website doesn't support this browser");
	});

	function showPosition(position) {
		console.log(position);
	}

	function navigate() {
		if (disableFindBed) {
			alert('Please allow the gps');
			return;
		}
		goto(ROUTES.TICKET);
	}

	// function logout() {
	// 	document.cookie = 'access_token=; max-age=0; path=/';
	// }
</script>

<svelte:head>
	<title>{$_('home_title')}</title>
</svelte:head>

<div class="flex flex-col min-h-content mx-auto">
	<!-- <Button on:click={() => logout()} /> -->
	<div class="flex">
		<div class="flex flex-grow">{$_('home_title')}</div>
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
		{#each tickets as ticket}
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

<style>
	.min-h-content {
		min-height: calc(100vh - 10rem);
	}
	.up-10 {
		transform: translateY(-10%);
	}
</style>
