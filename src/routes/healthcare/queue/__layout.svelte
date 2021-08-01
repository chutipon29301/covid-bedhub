<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { page } from '$app/stores';
	import { GetTicketsCount } from '$lib/generated/graphql';
	import { setIsLoading } from '$lib/store';
	import { onMount } from 'svelte';
	import Tabs from '$lib/components/ui/tabs/index.svelte';

	$: tabs = [
		$_('requests_label', { values: { amount: requestedAmount } }),
		$_('request_history_label', { values: { amount: acceptedAmount } })
	];
	let currentTab = $page.path === ROUTES.HEALTHCARE_QUEUE ? 0 : 1;
	let requestedAmount = 0;
	let acceptedAmount = 0;

	onMount(() => {
		getTicketsAmount();
	});

	function switchTab(index: number) {
		getTicketsAmount();
		goto(index ? ROUTES.HEALTHCARE_QUEUE_HISTORY : ROUTES.HEALTHCARE_QUEUE);
	}

	function getTicketsAmount() {
		const response = GetTicketsCount({});
		const unsub = response.subscribe(({ data, loading }) => {
			setIsLoading(loading);
			requestedAmount = data?.requestedAndAcceptedTicketsCount.requestedCount;
			acceptedAmount = data?.requestedAndAcceptedTicketsCount.acceptedCount;
			if (!loading) unsub();
		});
	}
</script>

<div class="text-3xl">{$_('home_title')}</div>
<Tabs {tabs} {currentTab} on:clickTab={(v) => switchTab(v.detail)}>
	<slot />
</Tabs>
