<script>
	import { page } from '$app/stores';
	import { variables } from '$lib/constants/environment';

	if (typeof window !== 'undefined' && !variables.dev) {
		window.dataLayer = window.dataLayer || [];
		window.gtag = function gtag() {
			window.dataLayer.push(arguments);
		};
		window.gtag('js', new Date());
		window.gtag('config', variables.gtag_id, { send_page_view: false });
	}
	$: {
		if (typeof window.gtag !== 'undefined') {
			window.gtag('config', variables.gtag_id, {
				page_path: $page.path
			});
		}
	}
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id={variables.gtag_id}"></script>
</svelte:head>
