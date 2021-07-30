<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { faPlusCircle, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { MyPatients, Patient } from '$lib/generated/graphql';
	import { setIsLoading } from '$lib/store';
	import { onMount } from 'svelte';
	import { setForm, setIllnesses, setPatientId, setSymptoms, setVaccine } from './store/store';
	import Fa from '$lib/components/ui/fa/index.svelte';
	import { illnessToChecklist } from '$lib/util';

	$: response = MyPatients({});

	let patients = [];

	onMount(() => {
		const unsub = response.subscribe(({ data, loading }) => {
			setIsLoading(loading);
			patients =
				data?.me.patients.map((t) => ({ name: `${t.firstName} ${t.lastName}`, id: t.id })) || [];

			if (!loading) unsub();
		});
	});

	function addNewPatient() {
		setPatientId(null);
		setIllnesses(null);
		setSymptoms(null);
		setVaccine(null);
		setForm(null);
		goto(ROUTES.TICKET_ILLNESSES);
	}

	function getPatient(id: string) {
		Patient({ variables: { id }, errorPolicy: 'all' }).subscribe(({ data, loading, errors }) => {
			setIsLoading(loading);
			if (!loading && !errors) {
				setPatientId(id);
				setIllnesses(illnessToChecklist(data?.patient.illnesses));
				setSymptoms(null);
				setVaccine(null);
				setForm({
					id: data?.patient.identification,
					dob: new Date(data?.patient.birthDate),
					firstName: data?.patient.firstName,
					lastName: data?.patient.lastName,
					sex: data?.patient.sex,
					mobile: data?.patient.tel,
					existed: true
				});
				goto(ROUTES.TICKET_ILLNESSES);
			}
		});
	}
</script>

<svelte:head>
	<title>{$_('patient_title')}</title>
</svelte:head>

<div class="text-3xl pb-4">{$_('patient_title')}</div>
<div
	on:click={() => addNewPatient()}
	class="border border-dashed px-4 py-2 w-full border-indigo-700 rounded-md flex justify-center cursor-pointer mb-4 bg-transparent text-indigo-400"
>
	<Fa class="mt-1 pr-2" icon={faPlusCircle} />
	{$_('add_new_patient')}
</div>
{#each patients as patient}
	<div
		on:click={() => getPatient(patient.id)}
		class="border px-4 py-2 w-full rounded-md flex justify-between cursor-pointer mb-4 bg-gray-100 drop-shadow-md"
	>
		<div>{patient.name}</div>
		<div class="flex">
			<span class="pr-4 text-gray-700">|</span>
			<Fa class="mt-1 text-gray-600" icon={faChevronRight} />
		</div>
	</div>
{/each}
