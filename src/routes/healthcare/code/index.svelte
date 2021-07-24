<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Card from '$lib/components/ui/card/general/index.svelte';
	import Button from '$lib/components/ui/button/index.svelte';

	let editingQueue = false,
		editingStaff = false;

	function toggleQueueCode() {
		editingQueue = !editingQueue;
	}

	function toggleStaffCode() {
		editingStaff = !editingStaff;
	}
</script>

<svelte:head>
	<title>{$_('healthcare_code_title')}</title>
</svelte:head>

<div class="text-3xl pb-2">{$_('invitation_code')}</div>
<Card class="pb-8" title={$_('queue_manager_label')}>
	<span slot="content"> edit_code_button </span>
	<span slot="footer">
		<div class="flex justify-center gap-4">
			<Button
				color="white"
				placeholder={$_(editingQueue ? 'cancel_button' : 'edit_code_button')}
				on:click={toggleQueueCode}
			/>
			<Button placeholder={$_(editingQueue ? 'save_button' : 'copy_code_button')} />
		</div>
	</span>
</Card>
<Card title={$_('staff_label')}>
	<span slot="content"> edit_code_button </span>
	<span slot="footer">
		<div class="flex justify-center gap-4">
			<Button
				color="white"
				placeholder={$_(editingStaff ? 'cancel_button' : 'edit_code_button')}
				on:click={toggleStaffCode}
			/>
			<Button placeholder={$_(editingStaff ? 'save_button' : 'copy_code_button')} />
		</div>
	</span>
</Card>
