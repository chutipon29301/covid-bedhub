<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { setDisabledContinueBtn, form$, setForm } from './store/store';
	import { onMount } from 'svelte';
	import Input from '$lib/components/ui/input/index.svelte';
	import DatePicker from '$lib/components/ui/datepicker';

	let id = $form$.id;
	let dob = $form$.dob;

	onMount(() => {
		setDisabledContinueBtn(!(!!id && !!dob));
	});

	function updateId() {
		console.log(id);
		verfifyFields();
	}

	function updateDOB() {
		console.log(dob);
		verfifyFields();
	}

	function verfifyFields() {
		console.log(id, dob, !!id && !!dob, !!id, !!dob);
		setForm({ ...$form$, id, dob });
		setDisabledContinueBtn(!(!!id && !!dob));
	}
</script>

<svelte:head>
	<title>{$_('profile_add_title')}</title>
</svelte:head>

<div class="text-3xl pb-2">
	{$_('profile_add_title')}
</div>
<Input class="pb-2" bind:value={id} label="profile_id_information" on:keyup={() => updateId()} />
<DatePicker
	classes="w-full border rounded-lg"
	bind:value={dob}
	on:confirmDate={() => updateDOB()}
	placeholder="profile_dob_information"
/>
