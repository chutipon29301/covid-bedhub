<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { onMount } from 'svelte';
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import { variables } from '$lib/constants/environment';
	import type { DecodedJwt } from '$lib/models';
	import Button from '$lib/components/ui/button/index.svelte';
	import Fa from '$lib/components/ui/fa/index.svelte';
	import cookie from 'cookie';
	import jwtDecode from 'jwt-decode';

	let screenSize: number, accountType: string;

	onMount(() => {
		screenSize = window.innerWidth;
		const { access_token } = cookie.parse(document.cookie);
		accountType = variables.dev
			? access_token?.split('-')[0]
			: access_token
			? jwtDecode<DecodedJwt>(access_token).accountType
			: null;
	});
</script>

<svelte:head>
	<title>{$_('home_title')}</title>
</svelte:head>

<div>
	{#if !accountType || accountType === 'reporter'}
		{#if screenSize > 1024}
			<img
				class="pb-1 cursor-pointer w-full"
				src="/banner/patient_image.png"
				alt="PatientBanner"
				on:click={() => goto(ROUTES.LOGIN)}
			/>
		{:else}
			<img
				class="pb-1 cursor-pointer w-full"
				src="/banner/patient_image_small.png"
				alt="PatientBanner"
				on:click={() => goto(ROUTES.LOGIN)}
			/>
		{/if}
		<Button
			class="w-full mb-4"
			placeholder={$_('login_as_patient')}
			on:click={() => goto(ROUTES.LOGIN)}
		>
			<span slot="icon"> <Fa class="pl-4" icon={faArrowRight} /></span>
		</Button>
		<div class="py-8 text-center">
			<p class="text-xl font-bold">{$_('tutorial_1_label')}</p>
			<p class="text-3xl font-bold pt-8 text-indigo-400">{$_('tutorial_2_label')}</p>
			<p class="text-md py-4 text-gray-500">{$_('tutorial_3_label')}</p>
			<p class="text-3xl font-bold pt-8 text-indigo-400">{$_('tutorial_4_label')}</p>
			<p class="text-md py-4 text-gray-500">{$_('tutorial_5_label')}</p>
			<p class="text-3xl font-bold pt-8 text-indigo-400">{$_('tutorial_6_label')}</p>
			<p class="text-md pt-4 text-gray-500">
				{$_('tutorial_7_label')}<br />{$_('tutorial_8_label')}
			</p>
		</div>
	{/if}
	{#if !accountType || accountType !== 'reporter'}
		<div class="pt-4">
			{#if screenSize > 1024}
				<img
					class="pb-1 cursor-pointer w-full"
					src="/banner/admin_image.png"
					alt="PatientBanner"
					on:click={() => goto(ROUTES.HEALTHCARE)}
				/>
			{:else}
				<img
					class="pb-1 cursor-pointer w-full"
					src="/banner/admin_image_small.png"
					alt="PatientBanner"
					on:click={() => goto(ROUTES.HEALTHCARE)}
				/>
			{/if}
			<div class="landing w-full">
				<Button
					class="w-full officer-color mb-4"
					placeholder={$_('login_as_officer')}
					on:click={() => goto(ROUTES.HEALTHCARE)}
				>
					<span slot="icon"> <Fa class="pl-4" icon={faArrowRight} /></span>
				</Button>
			</div>
			<div class="py-6 text-left text-sm">
				<p class="font-bold pb-4">{$_('contact_info_1_label')}</p>
				<p class="officer-text-color font-bold">{$_('contact_info_2_label')}</p>
				<p class="officer-text-color pb-6">{$_('contact_info_3_label')}</p>
				<p class="officer-text-color font-bold">{$_('contact_info_4_label')}</p>
				<p class="officer-text-color pb-6">{$_('contact_info_4_label')}</p>
				<p class="officer-text-color font-bold">{$_('contact_info_5_label')}</p>
				<p class="officer-text-color pb-6">{$_('contact_info_6_label')}</p>
				<p class="officer-text-color font-bold">{$_('contact_info_7_label')}</p>
				<p class="officer-text-color pb-6">{$_('contact_info_8_label')}</p>
				<p class="officer-text-color font-bold">{$_('contact_info_9_label')}</p>
				<p class="officer-text-color pb-6">{$_('contact_info_10_label')}</p>
				<p class="officer-text-color font-bold">{$_('contact_info_11_label')}</p>
				<p class="officer-text-color">{$_('contact_info_12_label')}</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.landing :global(.officer-color) {
		background-color: #313ae0 !important;
	}
	.officer-text-color {
		color: #313ae0 !important;
	}
</style>
