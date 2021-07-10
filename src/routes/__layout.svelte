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
	import { setContext } from 'svelte';

	setContext('translate', new Translate());
</script>

<div class="flex flex-col h-screen">
	<section class="flex items-center justify-center p-4">
		<div class="text-lg">COVID-BEDHUB</div>
	</section>
	<section class="flex-auto">
		<main class="p-6">
			<slot />
		</main>
	</section>
</div>
