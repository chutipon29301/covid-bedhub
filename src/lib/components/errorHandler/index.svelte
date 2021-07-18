<script lang="ts">
	import { onMount } from 'svelte';
	import { faExclamation } from '@fortawesome/free-solid-svg-icons';
	import { EModalColorTone } from '$lib/components/ui/modal/model';
	import { setIsLoading } from '$lib/store';
	import ErrorModal from '$lib/components/ui/modal/dialog/index.svelte';

	let errorShown = false;
	let errorHeader: string;
	let errorMsg: string;

	onMount(() => {
		window.onerror = (e: string) => {
			const error = JSON.parse(e.replace('Uncaught Error: ', ''));
			errorShown = true;
			errorHeader = error?.title || 'Unhandled Error';
			errorMsg = error?.message || 'An unexpected error happened';
			setIsLoading(false);
		};

		window.onunhandledrejection = async (e: PromiseRejectionEvent) => {
			errorShown = true;
			errorHeader = e.reason?.response?.data?.title || 'Unknown Error';
			errorMsg = e.reason?.response?.data?.msg || e.reason;
			setIsLoading(false);
		};
	});
</script>

{#if errorShown}
	<ErrorModal
		icon={faExclamation}
		colorTone={EModalColorTone.RED}
		heading={errorHeader}
		confirmBtn="OK"
		on:confirm={() => (errorShown = !errorShown)}
	>
		<p>{errorMsg}</p>
	</ErrorModal>
{/if}
