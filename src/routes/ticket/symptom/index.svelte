<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { illnesses$, setSymptoms, symptoms$ } from '../store/store';
	import { onDestroy, onMount } from 'svelte';
	import Checkbox from '$lib/components/ui/checkbox/index.svelte';
	import Template from '$lib/components/ticketLayout/index.svelte';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { saveProfileToStorage } from '../store/util';

	let FEVER = $symptoms$?.FEVER,
		COUGH = $symptoms$?.COUGH,
		SMELLESS_RASH = $symptoms$?.SMELLESS_RASH,
		DIARRHEA = $symptoms$?.DIARRHEA,
		TIRED_HEADACHE = $symptoms$?.TIRED_HEADACHE,
		DIFFICULT_BREATHING = $symptoms$?.DIFFICULT_BREATHING,
		ANGINA = $symptoms$?.ANGINA,
		EXHAUSTED = $symptoms$?.EXHAUSTED,
		CHEST_PAIN = $symptoms$?.CHEST_PAIN,
		UNCONCIOUS = $symptoms$?.UNCONCIOUS;

	onMount(() => {
		if (!$illnesses$) goto(ROUTES.TICKET);
	});

	onDestroy(() => {
		setSymptoms({
			FEVER,
			COUGH,
			SMELLESS_RASH,
			DIARRHEA,
			TIRED_HEADACHE,
			DIFFICULT_BREATHING,
			ANGINA,
			EXHAUSTED,
			CHEST_PAIN,
			UNCONCIOUS
		});
		saveProfileToStorage();
	});

	function onClickProceed() {
		const hasIllnesses = Object.values($illnesses$).some((v) => v);
		const hasSymptoms =
			FEVER ||
			COUGH ||
			SMELLESS_RASH ||
			DIARRHEA ||
			TIRED_HEADACHE ||
			DIFFICULT_BREATHING ||
			ANGINA ||
			EXHAUSTED ||
			CHEST_PAIN ||
			UNCONCIOUS;
		if (!hasIllnesses && !hasSymptoms) {
			goto(ROUTES.HOME_ISOLATION);
			return;
		}
		goto(ROUTES.TICKET_ADD);
	}
</script>

<svelte:head>
	<title>{$_('symptoms_web_title')}</title>
</svelte:head>

<Template
	title={$_('find_bed_information_label')}
	description={$_('current_symptom_label')}
	btnPlaceholer={$_('continue_button')}
	on:click={() => onClickProceed()}
>
	<Checkbox class="pb-5" bind:checked={FEVER} placeholder="symptom1_label" />
	<Checkbox class="pb-5" bind:checked={COUGH} placeholder="symptom2_label" />
	<Checkbox class="pb-5" bind:checked={SMELLESS_RASH} placeholder="symptom3_label" />
	<Checkbox class="pb-5" bind:checked={DIARRHEA} placeholder="symptom4_label" />
	<Checkbox class="pb-5" bind:checked={TIRED_HEADACHE} placeholder="symptom5_label" />
	<Checkbox class="pb-5" bind:checked={DIFFICULT_BREATHING} placeholder="symptom6_label" />
	<Checkbox class="pb-5" bind:checked={ANGINA} placeholder="symptom7_label" />
	<Checkbox class="pb-5" bind:checked={EXHAUSTED} placeholder="symptom8_label" />
	<Checkbox class="pb-5" bind:checked={CHEST_PAIN} placeholder="symptom9_label" />
	<Checkbox class="pb-5" bind:checked={UNCONCIOUS} placeholder="symptom10_label" />
</Template>
