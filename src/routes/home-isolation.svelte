<script>
	import { _ } from 'svelte-i18n';
	import Button from '$lib/components/ui/button/index.svelte';
</script>

<svelte:head>
	<title>{$_('suggestion_web_title')}</title>
</svelte:head>

<div class="text-3xl pb-4">{$_('low_risk_label')}</div>
<div class="px-4 pb-8">{$_('home_isolation_text')}</div>
<a href="https://line.me/R/ti/p/@comcovid-19" target="_blank">
	<Button class="w-full mb-4" placeholder="@comcovid-19" />
</a>
<a href="tel:1330">
	<Button class="w-full" placeholder={$_('contact_1330_label')} />
</a>
