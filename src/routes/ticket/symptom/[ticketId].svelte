<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export async function load({ page }: LoadInput): Promise<LoadOutput> {
		let ticketId = page.params.ticketId;
		return { props: { ticketId } };
	}
</script>

<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { page } from '$app/stores';
	import { EditSymptom, MyTicketSymptoms, Symptom } from '$lib/generated/graphql';
	import { onMount } from 'svelte';
	import { checklistToEnum, symptomToChecklist } from '$lib/util';
	import { setIsLoading } from '$lib/store';
	import { TICKET_STATUS } from '$lib/constants/constant';
	import Checkbox from '$lib/components/ui/checkbox/index.svelte';
	import Template from '$lib/components/ticketLayout/index.svelte';
	import Modal from '$lib/components/ui/modal/dialog/index.svelte';
	import { faHandsHelping } from '@fortawesome/free-solid-svg-icons';
	import { EModalColorTone } from '$lib/components/ui/modal/model';

	$: response = MyTicketSymptoms({
		variables: { id: $page.params.ticketId }
	});

	let symptoms = symptomToChecklist([]);
	let ticketInformation = null;
	let found = false;
	let successPopupShown = false;

	onMount(() => {
		const sub = response.subscribe(({ data, loading }) => {
			setIsLoading(loading);
			found =
				data?.myTicket &&
				(data?.myTicket.status === TICKET_STATUS.REQUEST ||
					data?.myTicket.status === TICKET_STATUS.MATCH);
			symptoms = symptomToChecklist(data?.myTicket?.symptoms);
			ticketInformation = {
				name: `${data?.myTicket?.patient.firstName} ${data?.myTicket?.patient.lastName}`,
				id: data?.myTicket?.patient.identification,
				mobile: data?.myTicket?.patient.tel,
				status: data?.myTicket?.status
			};
			if (!loading) sub();
		});
	});

	async function onClickProceed() {
		setIsLoading(true);
		const { data } = await EditSymptom({
			variables: {
				id: $page.params.ticketId,
				data: { symptoms: checklistToEnum<Symptom>(symptoms) }
			}
		});
		if (data) {
			setIsLoading(false);
			successPopupShown = true;
		}
	}

	function onClickOkPopup() {
		successPopupShown = false;
		goto(ROUTES.HOME);
	}
</script>

<svelte:head>
	<title>{$_('home_ticket_title')}</title>
</svelte:head>

{#if successPopupShown}
	<Modal
		icon={faHandsHelping}
		heading={$_('edit_symptoms_popup_heading')}
		confirmBtn={$_('ok_button')}
		colorTone={EModalColorTone.GREEN}
		on:confirm={onClickOkPopup}
	>
		{$_('edit_symptoms_popup_message', { values: { ticketId: $page.params.ticketId } })}
	</Modal>
{/if}
<Template
	title={$_('edit_symptoms_title')}
	btnPlaceholer={$_('save_button')}
	on:click={() => onClickProceed()}
>
	{#if found}
		<div class="flex flex-col pb-4">
			<p>
				{`${$_('edit_symptoms_name_label')}: ${ticketInformation.name}`}
			</p>
			<p>
				{`${$_('patient_id_information')}: ${ticketInformation.id}`}
			</p>
			<p>
				{`${$_('patient_mobile_information')}: ${ticketInformation.mobile}`}
			</p>
			<p class="font-bold">
				{`${$_('edit_symptoms_status_label')}: ${ticketInformation.status}`}
			</p>
		</div>
		<Checkbox class="pb-5" bind:checked={symptoms.FEVER} placeholder="symptom1_label" />
		<Checkbox class="pb-5" bind:checked={symptoms.COUGH} placeholder="symptom2_label" />
		<Checkbox class="pb-5" bind:checked={symptoms.SMELLESS_RASH} placeholder="symptom3_label" />
		<Checkbox class="pb-5" bind:checked={symptoms.DIARRHEA} placeholder="symptom4_label" />
		<Checkbox class="pb-5" bind:checked={symptoms.TIRED_HEADACHE} placeholder="symptom5_label" />
		<Checkbox
			class="pb-5"
			bind:checked={symptoms.DIFFICULT_BREATHING}
			placeholder="symptom6_label"
		/>
		<Checkbox class="pb-5" bind:checked={symptoms.ANGINA} placeholder="symptom7_label" />
		<Checkbox class="pb-5" bind:checked={symptoms.EXHAUSTED} placeholder="symptom8_label" />
		<Checkbox class="pb-5" bind:checked={symptoms.CHEST_PAIN} placeholder="symptom9_label" />
		<Checkbox class="pb-5" bind:checked={symptoms.UNCONCIOUS} placeholder="symptom10_label" />
	{:else}
		<div class="flex justify-center py-8">
			{$_('no_information_label')}
		</div>
	{/if}
</Template>
