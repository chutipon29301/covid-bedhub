<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
	import Fa from '$lib/components/ui/fa/index.svelte';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
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
