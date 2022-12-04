<script lang="ts">
	export let title: string;
</script>

<section class="rounded-md bg-white shadow">
	<!-- Section Heading -->
	<div
		class="flex flex-col gap-y-8 rounded-t-md border-b border-gray-200 bg-white px-4 py-5 sm:px-6"
	>
		<div
			class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
		>
			<div class="ml-4 mt-2">
				<h3 class="text-2xl font-medium leading-6 text-gray-900">
					{title}
				</h3>
			</div>
		</div>
	</div>

	<ul class="divide-y divide-gray-200">
		<slot />
	</ul>
</section>

<style>
	section {
		border-bottom-right-radius: var(--border-radius-b, 0.375rem);
		border-bottom-left-radius: var(--border-radius-b, 0.375rem);
	}
</style>
