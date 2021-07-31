<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
	import { ROUTES } from '$lib/constants/routes';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { setVaccine, vaccine$, form$ } from './store/store';
	import { dependantFieldsValidation, noFutureValidation } from '$lib/util';
	import type { Vaccine } from '$lib/models';
	import Fa from '$lib/components/ui/fa/index.svelte';
	import Input from '$lib/components/ui/input/index.svelte';
	import DatePicker from '$lib/components/ui/datepicker';
	import Template from '$lib/components/ticketLayout/index.svelte';
	import Dropdown from '$lib/components/ui/dropdown/index.svelte';
	import { saveProfileToStorage } from './store/util';

	$: disabledContinueBtn =
		!examReceiveDate ||
		!examLocation ||
		!examDate ||
		!noFutureValidation(examReceiveDate) ||
		!noFutureValidation(examDate) ||
		vaccines.every((v) => !(!v.name === !v.dateReceived));

	let vaccineList = ['Astrazeneca', 'Moderna', 'Pfizer', 'Sinopharm', 'Sinovac'];
	let examReceiveDate: Date = $vaccine$?.examReceiveDate,
		examLocation: string = $vaccine$?.examLocation,
		examDate: Date = $vaccine$?.examDate,
		vaccines: Vaccine[] = $vaccine$?.vaccines || [{ name: undefined, dateReceived: undefined }];

	onMount(() => {
		if (!$form$) goto(ROUTES.TICKET);
	});

	onDestroy(() => {
		setVaccine({
			examReceiveDate,
			examLocation,
			examDate,
			vaccines
		});
		saveProfileToStorage();
	});

	function onClickProceed() {
		if (disabledContinueBtn) return;
		goto(ROUTES.TICKET_REQUEST_LOCATION);
	}
</script>

<svelte:head>
	<title>{$_('home_ticket_title')}</title>
</svelte:head>

<Template
	title={$_('patient_add_title')}
	btnPlaceholer={$_('continue_button')}
	{disabledContinueBtn}
	on:click={() => onClickProceed()}
>
	<DatePicker
		required={true}
		classes="mb-4"
		placeholder={$_('exam_received_date_label')}
		bind:value={examReceiveDate}
		errorMessage={noFutureValidation(examReceiveDate)
			? ''
			: $_('validation_inline_error', { values: { field: $_('exam_received_date_label') } })}
	/>
	<Input
		required={true}
		class="pb-2"
		label={$_('exam_localtion_lable')}
		bind:value={examLocation}
	/>
	<DatePicker
		required={true}
		classes="mb-4"
		placeholder={$_('exam_date_label')}
		bind:value={examDate}
		errorMessage={noFutureValidation(examDate)
			? ''
			: $_('validation_inline_error', { values: { field: $_('exam_date_label') } })}
	/>
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

			<Dropdown
				class="pb-2"
				label={$_('vaccine_dose_label', { values: { order: i + 1 } })}
				list={vaccineList}
				bind:value={vaccine.name}
				errorMessage={dependantFieldsValidation(vaccine.name, vaccine.dateReceived)
					? ''
					: $_('required_field_error')}
			/>
			<DatePicker
				classes="mb-2"
				placeholder={$_('vaccine_date_label', { values: { order: i + 1 } })}
				bind:value={vaccine.dateReceived}
				errorMessage={dependantFieldsValidation(vaccine.dateReceived, vaccine.name)
					? ''
					: $_('required_field_error')}
			/>
		</div>
	{/each}
	{#if vaccines.length < 3}
		<div
			on:click={() =>
				(vaccines =
					vaccines.length < 3
						? [...vaccines, { name: undefined, dateReceived: undefined }]
						: vaccines)}
			class="border border-dashed mt-4 px-4 py-8 w-full border-indigo-700 rounded-md flex justify-center cursor-pointer bg-transparent text-indigo-400"
		>
			<Fa class="mt-1 pr-2" icon={faPlusCircle} />
			{$_('add_new_vaccine', { values: { order: vaccines.length + 1 } })}
		</div>
	{/if}
</Template>
