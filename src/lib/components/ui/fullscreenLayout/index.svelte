<script lang="ts">
	export let title = 'title';
	export let description = '';
</script>

<div class="flex flex-col min-h-content">
	<div class="flex-grow pb-4">
		<div class="text-3xl pb-4">{title}</div>
		{#if description}
			<div class="text-md pb-4">{description}</div>
		{/if}
		<slot name="content" />
	</div>
	<div>
		<slot name="footer" />
	</div>
</div>

<style>
	.min-h-content {
		min-height: calc(100vh - 7rem);
	}
</style>
