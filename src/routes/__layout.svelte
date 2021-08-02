<script context="module" lang="ts">
	import { authGuard } from '$lib/guards';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export function load({ page, fetch, session, context }: LoadInput): LoadOutput {
		return authGuard({ page, fetch, session, context });
	}
</script>

<script lang="ts">
	import '../app.postcss';
	import { _ } from 'svelte-i18n';
	import { Translate } from '$lib/services/translateService';
	import { isLogin$, setIsLogin } from '$lib/store';
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
	import ProgressiveImg from '$lib/components/ui/progressiveImg/index.svelte';
	import GoogleAnalytics from '$lib/components/googleAnalytics/index.svelte';

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
		}
		screenSize = window.innerWidth;
	});

	function logout() {
		document.cookie = 'access_token=; max-age=0;';
		goto(ROUTES.LANDING);
		location.reload();
	}
</script>

<GoogleAnalytics />
<ErrorHandler />
<Loading />
<div class="flex flex-col min-h-screen">
	<section class="flex p-4 shadow-md" class:justify-center={TICKET_FLOW.includes($page.path)}>
		{#if TICKET_FLOW.includes($page.path)}
			<div class="absolute left-6 cursor-pointer p-1" on:click={() => window.history.back()}>
				<Fa class="text-gray-700" size="lg" icon={faChevronLeft} />
			</div>
		{/if}
		<ProgressiveImg
			class="cursor-pointer"
			height="33px"
			dataSrc={window.innerWidth > 1024 ? '/main_logo/Logo.png' : '/main_logo/Logo_small.png'}
			src="/main_logo/Logo_progressive.png"
			alt="Logo"
			on:click={() => goto(ROUTES.LANDING)}
		/>
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
		<div class="flex gap-4 bg-indigo-50 p-4 officer-text-color text-xs mt-4 justify-center">
			<div class="text-center">
				{$_('copyright_label')}<br />
				{$_('thaibedhub_all_rights_label')}
			</div>
		</div>
	</section>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400&display=swap');

	:global(body) {
		font-family: 'Prompt', sans-serif !important;
	}

	.officer-text-color {
		color: #313ae0 !important;
	}
</style>
