<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { setDisabledContinueBtn, form$, setForm } from './store/store';
	import { onDestroy } from 'svelte';
	import Input from '$lib/components/ui/input/index.svelte';
	import DatePicker from '$lib/components/ui/datepicker';

	let { id, dob } = $form$;

	$: setDisabledContinueBtn(!(!!id && !!dob));

	onDestroy(() => {
		setForm({ ...$form$, id, dob });
	});
</script>

<svelte:head>
	<title>{$_('profile_add_title')}</title>
</svelte:head>

<div class="text-3xl pb-2">
	{$_('profile_add_title')}
</div>
<Input class="pb-2" bind:value={id} label="profile_id_information" />
<DatePicker bind:value={dob} placeholder="profile_dob_information" />
