<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { setDisabledContinueBtn, setSymptoms } from './store/store';
	import { onDestroy } from 'svelte';
	import Checkbox from '$lib/components/ui/checkbox/index.svelte';

	let symptom1 = false,
		symptom2 = false,
		symptom3 = false,
		symptom4 = false,
		symptom5 = false,
		symptom6 = false,
		symptom7 = false,
		symptom8 = false,
		symptom9 = false,
		symptom10 = false;

	$: setDisabledContinueBtn(
		!symptom1 &&
			!symptom2 &&
			!symptom3 &&
			!symptom4 &&
			!symptom5 &&
			!symptom6 &&
			!symptom7 &&
			!symptom8 &&
			!symptom9 &&
			!symptom10
	);

	onDestroy(() =>
		setSymptoms({
			symptom1,
			symptom2,
			symptom3,
			symptom4,
			symptom5,
			symptom6,
			symptom7,
			symptom8,
			symptom9,
			symptom10
		})
	);
</script>

<svelte:head>
	<title>{$_('home_ticket_title')}</title>
</svelte:head>

<Checkbox class="pb-5" bind:checked={symptom1} placeholder="symptom1_label" />
<Checkbox class="pb-5" bind:checked={symptom2} placeholder="symptom2_label" />
<Checkbox class="pb-5" bind:checked={symptom3} placeholder="symptom3_label" />
<Checkbox class="pb-5" bind:checked={symptom4} placeholder="symptom4_label" />
<Checkbox class="pb-5" bind:checked={symptom5} placeholder="symptom5_label" />
<Checkbox class="pb-5" bind:checked={symptom6} placeholder="symptom6_label" />
<Checkbox class="pb-5" bind:checked={symptom7} placeholder="symptom7_label" />
<Checkbox class="pb-5" bind:checked={symptom8} placeholder="symptom8_label" />
<Checkbox class="pb-5" bind:checked={symptom9} placeholder="symptom9_label" />
<Checkbox class="pb-5" bind:checked={symptom10} placeholder="symptom10_label" />
