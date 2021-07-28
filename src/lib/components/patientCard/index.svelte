<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { convertRiskLevelToLabel } from '$lib/util';
	import type { IllnessChecklist, PatientDetail, SymptomChecklist } from '$lib/models';
	import Card from '$lib/components/ui/card/detailed/index.svelte';

	let clazz = '';
	export { clazz as class };
	export let selectedTicket: PatientDetail;

	$: illnesses = checkListToLabel(selectedTicket?.symptops);
	$: symptoms = checkListToLabel(selectedTicket?.illnesses);

	function checkListToLabel(list: SymptomChecklist | IllnessChecklist) {
		if (!list) return [];
		return Object.entries(list)
			.map(([keys, value]) => {
				if (value) return keys;
				return null;
			})
			.filter((v) => v);
	}
</script>

{#if selectedTicket}
	<Card
		class={clazz}
		title={$_('patient_information_label')}
		tag={convertRiskLevelToLabel(selectedTicket.riskLevel)}
	>
		<span slot="title-detail">
			<div class="flex flex-col">
				<div class="text-sm font-semibold">{selectedTicket.createdAt.toLocaleDateString()}</div>
				<div class="text-xs grid justify-items-end -mt-1">
					{selectedTicket.createdAt.toLocaleTimeString()}
				</div>
			</div>
		</span>
		<span slot="header-detail">
			<div class="text-sm">
				<p>{selectedTicket.name}</p>
				<p>{`${$_('sex_label')}: ${selectedTicket.sex}`}</p>
				<p>{`${$_('age_label')}: ${selectedTicket.age}`}</p>
				<p>{`${$_('patient_id_information')}: ${selectedTicket.identification.slice(0, 13)}`}</p>
				<p>{`${$_('patient_mobile_information')}: ${selectedTicket.mobile}`}</p>
			</div>
		</span>
		<span slot="content-1">
			<div class="text-md font-bold pb-2">{$_('illness_label')}</div>
			<div class="text-sm px-4">
				{#if !illnesses.length}
					<p class="text-center">
						{$_('no_information_label')}
					</p>
				{/if}
				{#each illnesses as illness}
					<p>
						{illness}
					</p>
				{/each}
			</div>
		</span>
		<span slot="content-2">
			<div class="text-md font-bold pb-2">{$_('covid_exam_label')}</div>
			<div class="text-sm px-4">
				<p>{`${$_('exam_received_date_label')}: ${selectedTicket.examReceiveDate}`}</p>
				<p>{`${$_('exam_localtion_lable')}: ${selectedTicket.examLocation}`}</p>
				<p>{`${$_('exam_date_label')}: ${selectedTicket.examDate}`}</p>
				{#each selectedTicket.vaccines as vaccine, i}
					<p>
						{`${$_('vaccine_dose_label', { values: { amount: i } })}: ${vaccine.name} (${
							vaccine.dateReceived
						})`}
					</p>
				{/each}
			</div>
		</span>
		<span slot="content-3">
			<div class="text-md font-bold pb-2">{$_('current_symptom_label')}</div>
			<div class="text-sm px-4">
				{#if !symptoms.length}
					<p class="text-center">
						{$_('no_information_label')}
					</p>
				{/if}
				{#each symptoms as symptom}
					<p>
						{symptom}
					</p>
				{/each}
			</div>
		</span>
		<span slot="footer">
			<slot />
		</span>
	</Card>
{:else}
	<div
		class="{clazz} max-h-96 h-80 w-full border rounded-lg bg-gray-100 flex justify-center items-center text-gray-700"
		style="min-width: 350px;"
	>
		{$_('no_information_label')}
	</div>
{/if}
