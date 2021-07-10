<script context="module" lang="ts">
	import { authGuard } from '$lib/guards';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export async function load({ page, fetch, session, context }: LoadInput): Promise<LoadOutput> {
		return await authGuard({ page, fetch, session, context });
	}
</script>

<script lang="ts">
	import '../app.postcss';
	import { Translate } from '$lib/services/translateService';
	import { setIsLogin } from '$lib/store';
	import { parseCookies } from 'nookies';
	import { onMount, setContext } from 'svelte';
	import Loading from '$lib/components/loading/index.svelte';

	setContext('translate', new Translate());

	onMount(() => {
		console.log('hiii');
		const { access_token } = parseCookies();
		if (access_token) setIsLogin(true);
	});
</script>

<Loading />
<div class="flex flex-col min-h-screen">
	<section class="flex items-center justify-center p-4">
		<div class="text-lg">COVID-BEDHUB</div>
	</section>
	<section class="flex-auto flex-grow">
		<main class="p-6">
			<slot />
		</main>
	</section>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400&display=swap');

	:global(body) {
		font-family: 'Prompt', sans-serif;
	}
</style>
