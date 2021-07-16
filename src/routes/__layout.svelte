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
	import { setIsLogin, setUserProfile } from '$lib/store';
	import { onMount, setContext } from 'svelte';
	import cookie from 'cookie';
	import Loading from '$lib/components/loading/index.svelte';
	import ErrorHandler from '$lib/components/errorHandler/index.svelte';

	setContext('translate', new Translate());

	onMount(() => {
		const { access_token } = cookie.parse(document.cookie);
		if (access_token) {
			setIsLogin(true);
			setUserProfile({
				id: '1234567890123',
				dob: new Date('12-02-2020'),
				firstName: 'Developer',
				lastName: 'Tester',
				sex: 'M',
				address: '123',
				subDistrict: '456',
				district: '789',
				province: '000',
				zipcode: '12345',
				mobile: '0123456789'
			});
		}
	});
</script>

<ErrorHandler />
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
