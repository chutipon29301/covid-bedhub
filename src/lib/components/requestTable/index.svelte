<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';
	import type { TableHeader, TableData } from '../ui/table/models';
	import Table from '../ui/table/index.svelte';
	import Input from '../ui/input/index.svelte';
	import Button from '../ui/button/index.svelte';
	import Options from '$lib/components/ui/options/index.svelte';

	export let headers: TableHeader[];
	export let content: TableData[];
	export let noOfPages: number;
	export let currentPage: number;
	export let totalItems: number;

	const dispatch = createEventDispatcher();

	let search = '';
	let options = [
		{ label: 'all_label', value: 'all' },
		{ label: 'very_high_label', value: 'all' },
		{ label: 'high_label', value: 'all' },
		{ label: 'normal_label', value: 'all' },
		{ label: 'low_label', value: 'all' }
	];
</script>

<div class="min-width-table">
	<div class="p-2 grid grid-cols-5 gap-1 pb-2">
		<div class="grid grid-cols-4 gap-1 col-span-2">
			<Input class="col-span-3" bind:value={search} label={$_('search_label')} />
			<div class="manual-table">
				<Button placeholder={$_('search_button')} class="table-button" />
			</div>
		</div>
		<div class="flex gap-2 justify-end col-span-3">
			<p class="flex items-center mt-2">{$_('rish_level_label')}:</p>
			<Options
				class="mt-1"
				options={options.map((v) => $_(v.label, { values: { amount: '99+' } }))}
			/>
		</div>
	</div>
	<Table
		{headers}
		{content}
		{noOfPages}
		{currentPage}
		{totalItems}
		on:rowClick={(e) => dispatch('rowClick', e.detail.id)}
		on:goPrev={() => dispatch('goPrev')}
		on:goNext={() => dispatch('goNext')}
	/>
</div>

<style>
	.min-width-table {
		min-width: 800px;
		min-width: 70%;
	}
	.manual-table :global(.table-button) {
		padding: 11px 16px !important;
		margin-top: 0.5rem;
	}
</style>
