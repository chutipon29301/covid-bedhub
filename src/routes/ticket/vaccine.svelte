<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { faPlusCircle, faTimes, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
	import { ROUTES } from '$lib/constants/routes';
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { patientId$, setVaccine, vaccine$, form$, symptoms$, illnesses$ } from './store/store';
	import { CreatePatient, CreateTicket, UpdatePatient } from '$lib/generated/graphql';
	import { checklistToEnum, dateToStringFormat, vaccinePopulate } from '$lib/util';
	import { location$ } from '$lib/store';
	import { EModalColorTone } from '$lib/components/ui/modal/model';
	import type { Illness, Symptom } from '$lib/generated/graphql';
	import type { Vaccine } from '$lib/models';
	import Fa from '$lib/components/ui/fa/index.svelte';
	import Input from '$lib/components/ui/input/index.svelte';
	import DatePicker from '$lib/components/ui/datepicker';
	import Template from '$lib/components/ticketLayout/index.svelte';
	import Modal from '$lib/components/ui/modal/dialog/index.svelte';
	import Dropdown from '$lib/components/ui/dropdown/index.svelte';

	let successPopupShown = false;
	let vaccineList = ['Astrazeneca', 'Moderna', 'Pfizer', 'Sinopharm', 'Sinovac'];
	let ticketId: string;
	let examReceiveDate: Date = $vaccine$?.examReceiveDate,
		examLocation: string = $vaccine$?.examLocation,
		examDate: Date = $vaccine$?.examDate,
		vaccines: Vaccine[] = $vaccine$?.vaccines || [{ name: null, dateReceived: null }];

	onDestroy(() => {
		setVaccine({
			examReceiveDate,
			examLocation,
			examDate,
			vaccines
		});
	});

	async function newPatient(): Promise<string> {
		const { data } = await CreatePatient({
			variables: {
				data: {
					identification: $form$.id,
					firstName: $form$.firstName,
					lastName: $form$.lastName,
					birthDate: dateToStringFormat($form$.dob),
					sex: $form$.sex,
					tel: $form$.mobile,
					illnesses: checklistToEnum<Illness>($illnesses$)
				}
			},
			errorPolicy: 'all'
		});
		return data.createPatient.id;
	}

	async function existedPatient(id: string): Promise<string> {
		await UpdatePatient({
			variables: {
				data: {
					firstName: $form$.firstName,
					lastName: $form$.lastName,
					birthDate: dateToStringFormat($form$.dob),
					sex: $form$.sex,
					tel: $form$.mobile,
					illnesses: checklistToEnum<Illness>($illnesses$)
				},
				id: id
			},
			errorPolicy: 'all'
		});
		return id;
	}

	async function createTix(id: string): Promise<void> {
		const { data } = await CreateTicket({
			variables: {
				data: {
					patientId: +id,
					examReceiveDate: dateToStringFormat(examReceiveDate),
					examDate: dateToStringFormat(examDate),
					examLocation,
					symptoms: checklistToEnum<Symptom>($symptoms$),
					vaccines: vaccinePopulate(vaccines),
					lat: $location$.lat,
					lng: $location$.lng
				}
			},
			errorPolicy: 'all'
		});

		ticketId = data.createTicket.id;
		successPopupShown = true;
	}

	async function onClickProceed() {
		const id = $patientId$ ? await existedPatient($patientId$) : await newPatient();
		await createTix(id);
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
		heading={$_('request_popup_heading')}
		confirmBtn={'OK'}
		colorTone={EModalColorTone.GREEN}
		on:confirm={onClickOkPopup}
	>
		{$_('request_popup_message', { values: { ticketId } })}
	</Modal>
{/if}
<Template
	title={$_('patient_add_title')}
	btnPlaceholer={'contunue_button'}
	on:click={() => onClickProceed()}
>
	<DatePicker
		classes="mb-4"
		placeholder={$_('exam_received_date_label')}
		bind:value={examReceiveDate}
	/>
	<Input class="pb-2" label={$_('exam_localtion_lable')} bind:value={examLocation} />
	<DatePicker classes="mb-4" placeholder={$_('exam_date_label')} bind:value={examDate} />
	{#each vaccines as vaccine, i}
		<div
			class={i === 0 ? '' : 'border border-dashed pt-2 relative hover:border-red-400 rounded-md'}
		>
			{#if i !== 0}
				<div
					on:click={() =>
						(vaccines =
							vaccines.length > 1 ? [...vaccines.slice(0, vaccines.length - 1)] : vaccines)}
				>
					<Fa
						class="absolute -right-1 -top-2 text-gray-300 hover:text-red-400 cursor-pointer"
						icon={faTimes}
						size="sm"
					/>
				</div>
			{/if}
			<!-- <Input
				class="pb-2"
				label={$_('vaccine_dose_label', { values: { order: i + 1 } })}
				bind:value={vaccine.name}
			/> -->

			<Dropdown
				class="pb-2"
				label={$_('vaccine_dose_label', { values: { order: i + 1 } })}
				list={vaccineList}
				bind:value={vaccine.name}
			/>
			<DatePicker
				classes="mb-2"
				placeholder={$_('vaccine_date_label', { values: { order: i + 1 } })}
				bind:value={vaccine.dateReceived}
			/>
		</div>
	{/each}
	{#if vaccines.length < 3}
		<div
			on:click={() =>
				(vaccines =
					vaccines.length < 3 ? [...vaccines, { name: null, dateReceived: null }] : vaccines)}
			class="border border-dashed mt-4 px-4 py-8 w-full border-indigo-700 rounded-md flex justify-center cursor-pointer bg-transparent text-indigo-400"
		>
			<Fa class="mt-1 pr-2" icon={faPlusCircle} />
			{$_('add_new_vaccine')}
		</div>
	{/if}
</Template>
