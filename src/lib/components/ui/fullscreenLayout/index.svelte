<script lang="ts">
	export let title = 'title';
	export let description = '';
</script>

<div class="flex flex-col">
	<div class="flex-grow pb-8">
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
