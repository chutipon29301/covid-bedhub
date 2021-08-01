<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';
	import type { TableHeader, TableData } from '../ui/table/models';
	import Table from '../ui/table/index.svelte';
	import Input from '../ui/input/index.svelte';
	import Options from '$lib/components/ui/options/index.svelte';

	export let headers: TableHeader[];
	export let content: TableData[];
	export let totalItems: number;
	export let searchable = false;
	export let search = '';
	export let filterAmount = [0, 0, 0, 0];

	$: noOfPages = Math.ceil(totalItems / defaultPageSize);

	const dispatch = createEventDispatcher();
	let currentPage = 0;
	let defaultPageSize = 10;

	let options = [
		{ label: 'all_label', value: null },
		{ label: 'filter_very_high_label', value: 4 },
		{ label: 'filter_high_label', value: 3 },
		{ label: 'filter_normal_label', value: 2 },
		{ label: 'filter_low_label', value: 1 }
	];

	function goNext() {
		if (currentPage > noOfPages - 2) return;
		currentPage++;
		dispatch('pagination', defaultPageSize);
	}

	function goPrev() {
		if (!currentPage) return;
		currentPage--;
		dispatch('pagination', -defaultPageSize);
	}

	function handleFilter(index: number) {
		currentPage = 0;
		dispatch('filter', options[index].value);
	}

	function onkeypress(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;
		dispatch('search', search);
	}
</script>

<div class="min-width-table">
	<div class="p-2 grid gap-1 pb-2" class:grid-cols-5={searchable} class:grid-cols-3={!searchable}>
		{#if searchable}
			<div class="grid grid-cols-4 gap-1 col-span-2" on:keypress={onkeypress}>
				<Input class="col-span-3" bind:value={search} on: label={$_('search_label')} />
			</div>
		{/if}
		<div class="flex gap-2 justify-end col-span-3">
			<p class="flex items-center mt-2">{$_('rish_level_label')}:</p>
			<Options
				class="mt-1"
				on:selectOption={(v) => handleFilter(v.detail)}
				options={options.map((v, i) =>
					$_(v.label, {
						values: { amount: filterAmount[i - 1] > 99 ? '99+' : filterAmount[i - 1] }
					})
				)}
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
		on:goPrev={goPrev}
		on:goNext={goNext}
	/>
</div>

<style>
	.min-width-table {
		min-width: 800px;
		min-width: 70%;
	}
</style>
