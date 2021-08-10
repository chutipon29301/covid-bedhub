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
	import ProgressiveImg from '$lib/components/ui/progressiveImg/index.svelte';
	import { isJwt } from '$lib/util';
	import Alert from '$lib/components/ui/modal/dialog/index.svelte';
	import { faExclamation } from '@fortawesome/free-solid-svg-icons';
	import { EModalColorTone } from '$lib/components/ui/modal/model';

	let accountType: string;
	let loaded = false;
	let showAlert = false;

	onMount(() => {
		const { access_token } = cookie.parse(document.cookie);
		accountType = variables.dev
			? access_token?.split('-')[0]
			: access_token && isJwt(access_token)
			? jwtDecode<DecodedJwt>(access_token).accountType
			: null;
		loaded = true;
	});
</script>

<svelte:head>
	<title>{$_('web_title')}</title>
</svelte:head>

{#if showAlert}
	<Alert
		heading={$_('not_accept_ticket')}
		icon={faExclamation}
		confirmBtn="OK"
		colorTone={EModalColorTone.RED}
		on:confirm={() => goto(ROUTES.LOGIN)}
	>
		{$_('not_accept_ticket_detail')}
	</Alert>
{/if}
{#if loaded}
	<div>
		{#if !accountType || accountType === 'reporter'}
			<ProgressiveImg
				class="w-full mb-1 cursor-pointer"
				aspectRatio="2/1"
				dataSrc={window.innerWidth > 1024
					? '/banner/patient_image.png'
					: '/banner/patient_image_small.png'}
				src="/banner/patient_image_progressive.png"
				alt="PatientBanner"
				on:click={() => (showAlert = true)}
			/>
			<Button
				class="w-full mb-4"
				placeholder={$_('login_as_patient')}
				on:click={() => (showAlert = true)}
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
				<ProgressiveImg
					class="w-full mb-1 cursor-pointer"
					aspectRatio="2/1"
					dataSrc={window.innerWidth > 1024
						? '/banner/admin_image.png'
						: '/banner/admin_image_small.png'}
					src="/banner/admin_image_progressive.png"
					alt="AdminBanner"
					on:click={() => goto(ROUTES.HEALTHCARE)}
				/>
				<div class="landing w-full">
					<Button
						class="w-full officer-color mb-4"
						placeholder={$_('login_as_officer')}
						on:click={() => goto(ROUTES.HEALTHCARE)}
					>
						<span slot="icon"> <Fa class="pl-4" icon={faArrowRight} /></span>
					</Button>
				</div>
			</div>
		{/if}
		<div class="py-6 text-left text-sm">
			<p class="font-bold pb-4">{$_('contact_info_1_label')}</p>
			<p class="officer-text-color font-bold">
				{$_('contact_info_2_label')} <a class="underline" href="tel:1668">(โทร 1668)</a>
			</p>
			<p class="officer-text-color pb-6">{$_('contact_info_3_label')}</p>
			<p class="officer-text-color font-bold">
				{$_('contact_info_4_label')} <a class="underline" href="tel:1669">(โทร 1669)</a>
			</p>
			<p class="officer-text-color pb-6">{$_('contact_info_5_label')}</p>
			<p class="officer-text-color font-bold">
				{$_('contact_info_6_label')} (<a class="underline" href="tel:1330">โทร 1330</a> กด 0)
			</p>
			<p class="officer-text-color pb-6">{$_('contact_info_7_label')}</p>

			<p class="officer-text-color font-bold">
				{$_('contact_info_8_label')} <a class="underline" href="tel:1442">(โทร 1422)</a>
			</p>
			<p class="officer-text-color pb-6">{$_('contact_info_9_label')}</p>

			<p class="officer-text-color font-bold">
				{$_('contact_info_10_label')} <a class="underline" href="tel:1506">(โทร 1506)</a>
			</p>
			<p class="officer-text-color pb-6">{$_('contact_info_11_label')}</p>
			<p class="officer-text-color font-bold">
				{$_('contact_info_12_label')}
				<a class="underline" href="tel:0967711687">(โทร 096-771-1687)</a>
			</p>
			<p class="officer-text-color">{$_('contact_info_13_label')}</p>
		</div>
	</div>
{/if}

<style>
	.landing :global(.officer-color) {
		background-color: #313ae0 !important;
	}
	.officer-text-color {
		color: #313ae0 !important;
	}
</style>
