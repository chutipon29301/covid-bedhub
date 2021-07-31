<script context="module" lang="ts">
	import { authGuard } from '$lib/guards';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export function load({ page, fetch, session, context }: LoadInput): LoadOutput {
		return authGuard({ page, fetch, session, context });
	}
</script>

<script lang="ts">
	import '../app.postcss';
	import { Translate } from '$lib/services/translateService';
	import { isLogin$, setAccessToken, setIsLogin } from '$lib/store';
	import { onMount, setContext } from 'svelte';
	import { faSignOutAlt, faTimes, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
	import Fa from '$lib/components/ui/fa/index.svelte';
	import { goto } from '$app/navigation';
	import { ROUTES, TICKET_FLOW } from '$lib/constants/routes';
	import { page } from '$app/stores';
	import cookie from 'cookie';
	import Loading from '$lib/components/loading/index.svelte';
	import ErrorHandler from '$lib/components/errorHandler/index.svelte';
	import SentryService from '$lib/services/sentryService';

	setContext('translate', new Translate());
	setContext('sentry', new SentryService());

	let screenSize: number;
	let logoutButtonDisplay = [
		ROUTES.LANDING,
		ROUTES.HOME,
		ROUTES.HEALTHCARE_CODE,
		ROUTES.HEALTHCARE_STAFF,
		ROUTES.HEALTHCARE_QUEUE,
		ROUTES.HEALTHCARE_QUEUE_HISTORY
	];

	onMount(() => {
		const { access_token } = cookie.parse(document.cookie);
		if (access_token) {
			setIsLogin(true);
			setAccessToken(access_token);
		}
		screenSize = window.innerWidth;
	});

	function logout() {
		document.cookie = 'access_token=; max-age=0;';
		setIsLogin(false);
		goto(ROUTES.LANDING);
		location.reload();
	}
</script>

<ErrorHandler />
<Loading />
<div class="flex flex-col min-h-screen">
	<section class="flex p-4 shadow-md" class:justify-center={TICKET_FLOW.includes($page.path)}>
		{#if TICKET_FLOW.includes($page.path)}
			<div class="absolute left-6 cursor-pointer p-1" on:click={() => window.history.back()}>
				<Fa class="text-gray-700" size="lg" icon={faChevronLeft} />
			</div>
		{/if}

		{#if screenSize > 1024}
			<img
				on:click={() => goto(ROUTES.LANDING)}
				class="cursor-pointer"
				src="/main_logo/Logo.png"
				width="200px"
				alt="Logo"
			/>
		{:else}
			<img
				on:click={() => goto(ROUTES.LANDING)}
				class="cursor-pointer"
				src="/main_logo/Logo_small.png"
				width="200px"
				alt="Logo"
			/>
		{/if}
		{#if $isLogin$ && logoutButtonDisplay.includes($page.path)}
			<div
				class="border rounded-full bg-red-100 absolute right-6 cursor-pointer p-1"
				on:click={() => logout()}
			>
				<Fa class="text-red-500" size="lg" icon={faSignOutAlt} />
			</div>
		{:else if $isLogin$ && $page.path !== ROUTES.LANDING}
			<div class="absolute right-6 cursor-pointer" on:click={() => goto(ROUTES.HOME)}>
				<Fa class="text-gray-700" size="2rem" icon={faTimes} />
			</div>
		{/if}
	</section>
	<section class="flex-auto flex-grow">
		<main class="p-4">
			<slot />
		</main>
	</section>
	<section>
		<div class="bg-indigo-50 text-center p-4 officer-text-color text-xs mt-4">
			Copyright©2020<br /> Thaibedhub, All Rights Reserved.
		</div>
	</section>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400&display=swap');

	:global(body) {
		font-family: 'Prompt', sans-serif;
	}

	.officer-text-color {
		color: #313ae0 !important;
	}
</style>
