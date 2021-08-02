<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { faExclamation } from '@fortawesome/free-solid-svg-icons';
	import { EModalColorTone } from '$lib/components/ui/modal/model';
	import { error$, setIsLoading } from '$lib/store';
	import { Severity } from '@sentry/browser';
	import ErrorModal from '$lib/components/ui/modal/dialog/index.svelte';
	import * as Sentry from '@sentry/browser';

	let errors: {
		heading: string;
		message: string;
	}[] = [];

	error$.subscribe((err) => {
		setIsLoading(false);
		if (!err) return;
		let error = err;
		if (err.code)
			error = {
				heading: $_(err.heading),
				message: $_(err.message),
				code: err.code
			};
		errors = [...errors, error];
		switch (err.code) {
			case 'network':
				Sentry.captureEvent({ message: `GraphQLError: NetworkError`, level: Severity.Critical });
				break;
			default:
				Sentry.captureEvent({ message: `GraphQLError: ${error.message}`, level: Severity.Info });
				break;
		}
	});

	onMount(() => {
		window.onerror = (e: string) => {
			setIsLoading(false);
			errors = [
				...errors,
				{
					heading: 'Unhandled Error',
					message: e || 'An unexpected error happened'
				}
			];
			Sentry.captureException(e);
		};

		window.onunhandledrejection = async (e: PromiseRejectionEvent) => {
			setIsLoading(false);
			errors = [
				...errors,
				{
					heading: 'Promise Error',
					message: e.reason
				}
			];
			Sentry.captureMessage('PromiseError', { extra: { reason: e.reason }, level: Severity.Error });
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
		heading={error?.heading}
		confirmBtn="OK"
		on:confirm={() => removeErrors(i)}
	>
		<p>{error?.message}</p>
	</ErrorModal>
{/each}
