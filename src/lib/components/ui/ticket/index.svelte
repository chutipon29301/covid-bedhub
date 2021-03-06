<script lang="ts">
	import { _ } from 'svelte-i18n';
	import {
		faUser,
		faIdCard,
		faHospitalAlt,
		faCalendarAlt,
		faPen,
		faCheckCircle,
		faHourglassHalf,
		faBan,
		faCalendarTimes
	} from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import Fa from '$lib/components/ui/fa/index.svelte';
	import Button from '$lib/components/ui/button/index.svelte';
	import { TICKET_STATUS, TICKET_STATUS_LABEL } from '$lib/constants/constant';

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
	{#if status === TICKET_STATUS.REQUEST || status === TICKET_STATUS.MATCH}
		<div on:click={() => dispatch('clickEdit')}>
			<Fa class="text-gray-500 absolute right-4 top-4 cursor-pointer" icon={faPen} />
		</div>
	{/if}
	<div class="p-2 w-full h-full overflow-y-auto text-gray-100">
		<div class="grid grid-cols-12 text-gray-500 my-1">
			<div class="flex justify-center items-center">
				<Fa class="pr-4" icon={faUser} />
			</div>
			<span class="col-span-11">{name}</span>
		</div>
		<div class="grid grid-cols-12 text-gray-500 my-1">
			<div class="flex justify-center items-center">
				<Fa class="pr-4" icon={faIdCard} />
			</div>
			<span class="col-span-11">{id}</span>
		</div>
		{#if appointmentDate}
			<div class="grid grid-cols-12 text-gray-500 my-1">
				<div class="flex justify-center items-center">
					<Fa class="pr-4" icon={faCalendarAlt} />
				</div>
				<span class="col-span-11">{new Date(appointmentDate).toDateString()}</span>
			</div>
			<div class="grid grid-cols-12 text-gray-500 my-1">
				<div class="flex justify-center items-center">
					<Fa class="pr-4" icon={faHospitalAlt} />
				</div>
				<span class="col-span-11">{hospitalName}</span>
			</div>
		{/if}
		<div class="pt-4">
			{#if status === TICKET_STATUS.REQUEST}
				<Button
					class="w-full"
					color="red"
					on:click={() => dispatch('clickButton', status)}
					placeholder={$_('cancel_request_button')}
				/>
			{:else if status === TICKET_STATUS.MATCH}
				<Button
					on:click={() => dispatch('clickButton', status)}
					class="w-full"
					placeholder={$_('see_hospital_button')}
				/>
			{:else if status !== TICKET_STATUS.EXPIRED}
				<div class="w-full border rounded-sm border-red-400 text-red-400 flex justify-center py-3">
					{$_('cancel_request_success_label')}
				</div>
			{/if}
		</div>
	</div>

	<div class="p-2 bg-gray-200 text-blue-900 rounded-b">
		<div class="flex text-gray-500 my-1">
			{#if status === TICKET_STATUS.MATCH}
				<Fa class="text-green-500" icon={faCheckCircle} size="lg" />
			{:else if status === TICKET_STATUS.REQUEST}
				<Fa class="text-yellow-500" icon={faHourglassHalf} size="lg" />
			{:else if status === TICKET_STATUS.EXPIRED}
				<Fa class="text-gray-500" icon={faCalendarTimes} size="lg" />
			{:else}
				<Fa class="text-gray-500" icon={faBan} size="lg" />
			{/if}
			<div class="pl-4 text-gray-600">
				{$_(TICKET_STATUS_LABEL[status])}
			</div>
		</div>
	</div>
</div>
