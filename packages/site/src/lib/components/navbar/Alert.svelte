<script lang="ts">
	import HeroiconsExclamationTriangle from '~icons/heroicons/exclamation-triangle';
	import HeroiconsXMark from '~icons/heroicons/x-mark';

	const key = 'alert';

	let dismissed =
		typeof window !== 'undefined' ? localStorage.getItem(key) === 'true' : true;
</script>

{#if !dismissed}
	<div class="md:px-6 lg:px-8">
		<div class="border-l-4 border-yellow-400 bg-yellow-50 py-4 print:hidden">
			<div class="flex justify-center">
				<div class="flex-shrink-0 px-2">
					<HeroiconsExclamationTriangle
						class="h-5 w-5 text-yellow-400"
						aria-hidden="true"
					/>
				</div>
				<div class="ml-3 grow">
					<p class="text-sm text-yellow-700">
						This is a staging environment for demo & testing purposes. Data
						entered here will be routinely deleted.
					</p>
				</div>
				<div class="px-2">
					<button
						class="inline-flex rounded-md bg-yellow-50 text-yellow-500 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
						on:click={() => {
							localStorage.setItem(key, 'true');
							dismissed = true;
						}}
					>
						<span class="sr-only">Dismiss</span>
						<HeroiconsXMark class="h-5 w-5" aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
