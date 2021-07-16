<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { MyPatients } from '$lib/generated/graphql';
	import { setIsLoading } from '$lib/store';
	import Fa from '$lib/components/ui/fa/index.svelte';

	$: response = MyPatients({});
	$: setIsLoading($response.loading);
	$: patients = $response.data?.me.patients.map((t) => `${t.firstName} ${t.lastName}`) || [];
</script>

<svelte:head>
	<title>{$_('profile_title')}</title>
</svelte:head>

<section>{$_('profile_title')}</section>
<div class="grid grid-cols-2">
	<div
		class="flex items-center flex-col cursor-pointer"
		on:click={() => goto(`${ROUTES.TICKET_ADD}`)}
	>
		<Fa class="text-gray-700" icon={faUser} size="5rem" />
		<p class="pt-1">{$_('book_for_yourself_label')}</p>
	</div>
	<div
		class="flex items-center flex-col cursor-pointer"
		on:click={() => goto(`${ROUTES.TICKET_ADD}?other=true`)}
	>
		<Fa class="text-gray-700" icon={faUsers} size="5rem" />
		<p class="pt-1">{$_('book_for_other_label')}</p>
	</div>
</div>

<div class="pt-2">
	รายชื่อล่าสุด

	{#each patients as patient}
		<p>
			{patient}
		</p>
	{/each}
</div>
