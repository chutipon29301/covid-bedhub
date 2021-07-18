<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Checkbox from '$lib/components/ui/checkbox/index.svelte';
	import Template from '$lib/components/ticketLayout/index.svelte';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { illnesses$, setIllnesses } from './store/store';

	let NCDs = $illnesses$?.NCDs,
		CARDIOVASCULAR = $illnesses$?.CARDIOVASCULAR,
		CKD = $illnesses$?.CKD,
		STROKE = $illnesses$?.STROKE,
		OBESITY = $illnesses$?.OBESITY,
		CANCER = $illnesses$?.CANCER,
		DIABETES = $illnesses$?.DIABETES;

	function onClickProceed() {
		setIllnesses({
			NCDs,
			CARDIOVASCULAR,
			CKD,
			STROKE,
			OBESITY,
			CANCER,
			DIABETES
		});
		goto(ROUTES.TICKET_SYMPTOM);
	}
</script>

<svelte:head>
	<title>{$_('home_ticket_title')}</title>
</svelte:head>

<Template btnPlaceholer={'contunue_button'} on:click={() => onClickProceed()}>
	<Checkbox class="pb-5" bind:checked={NCDs} placeholder="illness1_label" />
	<Checkbox class="pb-5" bind:checked={CARDIOVASCULAR} placeholder="illness2_label" />
	<Checkbox class="pb-5" bind:checked={CKD} placeholder="illness3_label" />
	<Checkbox class="pb-5" bind:checked={STROKE} placeholder="illness4_label" />
	<Checkbox class="pb-5" bind:checked={OBESITY} placeholder="illness5_label" />
	<Checkbox class="pb-5" bind:checked={CANCER} placeholder="illness6_label" />
	<Checkbox class="pb-5" bind:checked={DIABETES} placeholder="illness7_label" />
</Template>
