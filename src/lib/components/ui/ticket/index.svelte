<script lang="ts">
	import {
		faUser,
		faIdCard,
		faHospitalAlt,
		faCalendarAlt,
		faPen
	} from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import Fa from '$lib/components/ui/fa/index.svelte';
	import Button from '$lib/components/ui/button/index.svelte';

	export let name: string;
	export let id: string;
	export let status: string;
	export let appointmentDate = '';
	export let hospitalName = '';

	const dispatch = createEventDispatcher();
</script>

<div
	class="max-w-md mx-auto xl:max-w-5xl lg:max-w-5xl md:max-w-2xl bg-gray-100 max-h-screen shadow-2xl flex-row rounded relative"
>
	{#if status === '1'}
		<div on:click={() => dispatch('clickEdit')}>
			<Fa class="text-gray-500 absolute right-4 top-4 cursor-pointer" icon={faPen} />
		</div>
	{/if}
	<div class="p-2 w-full h-full overflow-y-auto text-gray-100">
		<div class="flex text-gray-500 my-1">
			<Fa class="mt-1 pr-4" icon={faUser} />
			{name}
		</div>
		<div class="flex text-gray-500 my-1">
			<Fa class="mt-1 pr-4" icon={faIdCard} />
			{id}
		</div>
		{#if appointmentDate}
			<div class="flex text-gray-500 my-1">
				<Fa class="mt-1 pr-4" icon={faCalendarAlt} />
				{appointmentDate}
			</div>
			<div class="flex text-gray-500 my-1">
				<Fa class="mt-1 pr-4" icon={faHospitalAlt} />
				{hospitalName}
			</div>
		{/if}
		<div class="pt-4">
			{#if status === '1'}
				<Button isFullWidth={true} placeholder="ดูข้อมูล รพ." />
			{:else if status === '2'}
				<Button isFullWidth={true} placeholder="ดูข้อมูล รพ." />
			{:else}
				<Button isFullWidth={true} placeholder="ดูข้อมูล รพ." />
			{/if}
		</div>
	</div>

	<div class="p-2 bg-gray-200 text-blue-900 rounded-b">
		<div class="flex text-gray-500 my-1">
			<div class="bg-green-500 h-5 w-5 rounded-2xl" />
			<div class="pl-4 text-gray-600">
				{status}
			</div>
		</div>
	</div>
</div>
