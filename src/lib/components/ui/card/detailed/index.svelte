<script lang="ts">
	let clazz = '';
	export { clazz as class };
	export let title: string;
	export let tag = '';
</script>

<div class="{clazz} w-full h-full flex flex-col justify-center items-center">
	<div class="min-w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
		<div class="py-4 px-8 mt-3">
			<div class="flex flex-col pb-2">
				<div class="flex justify-between">
					<div class="flex">
						<h2 class="text-gray-700 font-semibold text-xl tracking-wide mb-2">
							{title}
						</h2>
						{#if tag}
							<div class="bg-red-200 rounded-3xl flex items-center px-2 text-xs h-5 mt-1 ml-1">
								{tag}
							</div>
						{/if}
					</div>
					<slot name="title-detail" />
				</div>
				<slot name="header-detail" />
			</div>
			<div class="bg-gray-100 rounded-lg mb-2">
				<div class="py-4 px-4">
					<slot name="content-1" />
				</div>
			</div>
			<div class="bg-gray-100 rounded-lg mb-2">
				<div class="py-4 px-4">
					<slot name="content-2" />
				</div>
			</div>
			<div class="bg-gray-100 rounded-lg mb-2">
				<div class="py-4 px-4">
					<slot name="content-2" />
				</div>
			</div>
			<div class="py-4">
				<slot name="footer" />
			</div>
		</div>
	</div>
</div>
