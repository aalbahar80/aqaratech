<script lang="ts">
	import { slide } from 'svelte/transition';
	import HeroiconsXMark20Solid from '~icons/heroicons/x-mark-20-solid';

	let visible = true;
</script>

{#if visible}
	<div class="relative bg-indigo-600" class:hidden={!visible} out:slide>
		<div class="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
			<div class="pr-16 sm:px-16 sm:text-center">
				<p class="font-medium text-white">
					<span class="md:hidden">We announced a new product!</span>
					<span class="hidden md:inline"
						>Big news! We're excited to announce a brand new product.</span
					>
					<span class="block sm:ml-2 sm:inline-block">
						<a href="/" class="font-bold text-white underline">
							{' '}
							Learn more <span aria-hidden="true">&rarr;</span>
						</a>
					</span>
				</p>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:items-start sm:pt-1 sm:pr-2"
			>
				<button
					type="button"
					class="flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
					on:click={() => (visible = false)}
				>
					<span class="sr-only">Dismiss</span>
					<HeroiconsXMark20Solid
						class="h-6 w-6 text-white"
						aria-hidden="true"
					/>
				</button>
			</div>
		</div>
	</div>
{/if}
