<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Input from '$lib/components/ui/input/index.svelte';

	let value = '';

	function onKeydown(e) {
		console.log(e);
	}
</script>

<svelte:head>
	<title>{$_('profile_add_title')}</title>
</svelte:head>

<div class="text-3xl pb-2">
	{$_('profile_add_title')}
</div>
<Input class="pb-2" {value} on:keydown={(e) => onKeydown(e)} />
<Input class="pb-2" {value} on:keydown={(e) => onKeydown(e)} />
<Input class="pb-2" {value} on:keydown={(e) => onKeydown(e)} />
<Input class="pb-2" {value} on:keydown={(e) => onKeydown(e)} />
<Input class="pb-2" {value} on:keydown={(e) => onKeydown(e)} />
<Input class="pb-2" {value} on:keydown={(e) => onKeydown(e)} />
<Input class="pb-2" {value} on:keydown={(e) => onKeydown(e)} />
