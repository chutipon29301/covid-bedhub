<script lang="ts">
	let clazz = '';
	export { clazz as class };
	export let title: string;
</script>

<div class="{clazz} w-full flex flex-col justify-center items-center">
	<div class="min-w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
		<div class="py-4 px-8 mt-3">
			<div class="flex flex-col mb-8">
				<h2 class="text-gray-700 font-semibold text-2xl tracking-wide mb-2">
					{title}
				</h2>
				<slot name="desc" />
			</div>
			<div class="bg-gray-100 rounded-lg">
				<div class="py-4 px-4">
					<slot name="content" />
				</div>
			</div>
			<div class="py-4">
				<slot name="footer" />
			</div>
		</div>
	</div>
</div>
