<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Tabs from '$lib/components/ui/tabs/index.svelte';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { page } from '$app/stores';

	let tabs = [$_('requests_label'), $_('request_history_label')];
	let currentTab = $page.path === ROUTES.HEALTHCARE_QUEUE ? 0 : 1;

	function switchTab(index: number) {
		goto(index ? ROUTES.HEALTHCARE_QUEUE_HISTORY : ROUTES.HEALTHCARE_QUEUE);
	}
</script>

<div class="text-3xl">{$_('home_title')}</div>
<Tabs {tabs} {currentTab} on:clickTab={(v) => switchTab(v.detail)}>
	<slot />
</Tabs>
