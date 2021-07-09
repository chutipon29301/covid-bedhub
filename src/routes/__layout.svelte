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
	import { ROUTES } from '$lib/constants/routes';

	setContext('translate', new Translate());
</script>

{#each Object.entries(ROUTES) as [key, value]}
	<a class="text-blue-700 pr-2" href={value}>{key}</a>
{/each}

<main>
	<slot />
</main>
