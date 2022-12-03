<script lang="ts">
	import HeroiconsExclamationTriangle from '~icons/heroicons/exclamation-triangle';

	const key = 'alert';
	let dismissed =
		typeof window !== 'undefined' ? localStorage.getItem(key) === 'true' : true;
</script>

{#if !dismissed}
	<div class="md:px-6 lg:px-8">
		<div class="border-l-4 border-yellow-400 bg-yellow-50 py-4 print:hidden">
			<div class="flex justify-center">
				<div class="flex-shrink-0">
					<HeroiconsExclamationTriangle
						class="h-5 w-5 text-yellow-400"
						aria-hidden="true"
					/>
				</div>
				<div class="ml-3">
					<p class="text-sm text-yellow-700">
						This is a staging environment for demo & testing purposes. Data
						entered here will be routinely deleted.
					</p>
				</div>
				<button
					on:click={() => {
						localStorage.setItem(key, 'true');
						dismissed = true;
					}}
				>
					Dismiss
				</button>
			</div>
		</div>
	</div>
{/if}
