<script lang="ts">
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import type { TableHeader, TableData } from './models';
	import Fa from '$lib/components/ui/fa/index.svelte';

	export let headers: TableHeader[];
	export let content: TableData[];
	export let noOfPages = 0;
	export let totalItems = 0;
	export let currentPage = 0;

	const dispatch = createEventDispatcher();
</script>

<div class="p-2">
	<div class="align-middle inline-block min-w-full shadow-lg px-8 pt-3 rounded-bl-lg rounded-br-lg">
		<table class="border-collapse min-w-full">
			<thead>
				<tr class="border-b-2 border-gray-300">
					{#each headers as header}
						{#if header.field !== 'button'}
							<th class="px-4 py-3 text-left text-indigo-500">
								{header.label}
							</th>
						{:else}
							<th class="px-4 py-3" />
						{/if}
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each content as record}
					<tr class="border-b-2 hover:bg-gray-100" on:click={() => dispatch('rowClick', record)}>
						{#each headers.map((h) => h.field) as field}
							<td class="p-4">
								{#if Array.isArray(record[field])}
									{#each record[field] as text}
										<p class="text-sm text-gray-700">{text}</p>
									{/each}
								{:else}
									<p class="text-sm text-gray-700">{record[field]}</p>
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
		<div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
			<p class="text-sm leading-5 text-indigo-700 pb-4">
				Showing
				<span class="font-medium">{currentPage * content.length + 1}</span>
				to
				<span class="font-medium">{(currentPage + 1) * content.length}</span>
				of
				<span class="font-medium">{totalItems || content.length}</span>
				results
			</p>
			<nav class="inline-flex shadow-sm pb-4">
				{#if noOfPages}
					<div
						on:click={() => dispatch('goPrev')}
						class="inline-flex items-center p-2 rounded-l-md border border-gray-300 text-sm font-medium text-gray-500
            {currentPage === 0
							? 'bg-gray-100'
							: 'cursor-pointer bg-white hover:text-gray-400 focus:outline-none active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150'}"
					>
						<Fa class="h-5 w-5 p-1" icon={faChevronLeft} />
					</div>
					<div
						on:click={() => dispatch('goNext')}
						class=" -ml-px inline-flex items-center p-2 rounded-r-md border border-gray-300  text-sm font-medium text-gray-500 
            {currentPage === noOfPages - 1
							? 'bg-gray-100'
							: 'cursor-pointer bg-white hover:text-gray-400 focus:outline-none active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150'}"
					>
						<Fa class="h-5 w-5 p-1" icon={faChevronRight} />
					</div>
				{/if}
			</nav>
		</div>
	</div>
</div>
