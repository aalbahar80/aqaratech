<script lang="ts">
	import HeroiconsChevronLeft20Solid from '~icons/heroicons/chevron-left-20-solid';
	import HeroiconsPrinter from '~icons/heroicons/printer';

	export let id: string;
</script>

<div class="p-4 print:hidden sm:p-0">
	<div>
		<nav aria-label="Back">
			<a
				href={`/leases/${id}`}
				class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
			>
				<HeroiconsChevronLeft20Solid
					class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
					aria-hidden="true"
				/>
				Back
			</a>
		</nav>
	</div>
	<div class="mt-2 md:flex md:items-center md:justify-between">
		<div class="min-w-0 flex-1">
			<h2
				class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
			>
				Lease Contract
			</h2>
			<p class="max-w-md text-sm text-gray-500">
				This contract has been automatically generated. You may edit the text
				before printing.
			</p>
		</div>
		<div class="mt-4 flex flex-shrink-0 md:mt-0 md:ml-4">
			<button
				type="button"
				on:click={() => {
					window.print();
				}}
				class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				<HeroiconsPrinter class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
				Print
			</button>
		</div>
	</div>
</div>
