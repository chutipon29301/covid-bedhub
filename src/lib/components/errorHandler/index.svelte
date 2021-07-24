<script lang="ts">
	import { onMount } from 'svelte';
	import { faExclamation } from '@fortawesome/free-solid-svg-icons';
	import { EModalColorTone } from '$lib/components/ui/modal/model';
	import { setIsLoading } from '$lib/store';
	import ErrorModal from '$lib/components/ui/modal/dialog/index.svelte';

	let errors: {
		heading: string;
		message: string;
	}[] = [];

	onMount(() => {
		window.onerror = (e: string) => {
			const error = JSON.parse(e.replace('Uncaught Error: ', ''));
			errors = [
				...errors,
				{
					heading: error?.title || 'Unhandled Error',
					message: error?.message || 'An unexpected error happened'
				}
			];
			setIsLoading(false);
		};

		window.onunhandledrejection = async (e: PromiseRejectionEvent) => {
			errors = [
				...errors,
				{
					heading: e.reason?.response?.data?.title || 'Unknown Error',
					message: e.reason?.response?.data?.msg || e.reason
				}
			];
			setIsLoading(false);
		};
	});

	function removeErrors(index: number): void {
		errors.splice(index, 1);
		errors = [...errors];
	}
</script>

{#each errors as error, i}
	<ErrorModal
		icon={faExclamation}
		colorTone={EModalColorTone.RED}
		heading={error.heading}
		confirmBtn="OK"
		on:confirm={() => removeErrors(i)}
	>
		<p>{error.message}</p>
	</ErrorModal>
{/each}
