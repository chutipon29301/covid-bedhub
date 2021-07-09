<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let placeholder = 'Button';
</script>

<button class="bg-blue-500 px-4 py-3 rounded text-gray-200 font-semibold hover:bg-blue-600">
	{$_(placeholder)}
</button>
