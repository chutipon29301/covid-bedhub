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
			: jwtDecode<DecodedJwt>(access_token).accountType;
	});
</script>

<svelte:head>
	<title>{$_('home_title')}</title>
</svelte:head>

<div class="flex flex-col items-center">
	{#if !accountType || accountType === 'reporter'}
		{#if screenSize > 1024}
			<img
				class="pb-1 cursor-pointer"
				src="/banner/patient_image.png"
				alt="PatientBanner"
				on:click={() => goto(ROUTES.LOGIN)}
			/>
		{:else}
			<img
				class="pb-1 cursor-pointer"
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
	{/if}
	{#if !accountType || accountType !== 'reporter'}
		{#if screenSize > 1024}
			<img
				class="pb-1 cursor-pointer"
				src="/banner/admin_image.png"
				alt="PatientBanner"
				on:click={() => goto(ROUTES.HEALTHCARE)}
			/>
		{:else}
			<img
				class="pb-1 cursor-pointer"
				src="/banner/admin_image_small.png"
				alt="PatientBanner"
				on:click={() => goto(ROUTES.HEALTHCARE)}
			/>
		{/if}
		<div class="landing w-full">
			<Button
				class="w-full officer-color"
				placeholder={$_('login_as_officer')}
				on:click={() => goto(ROUTES.HEALTHCARE)}
			>
				<span slot="icon"> <Fa class="pl-4" icon={faArrowRight} /></span>
			</Button>
		</div>
	{/if}
</div>

<style>
	.landing :global(.officer-color) {
		background-color: #313ae0 !important;
	}
</style>
