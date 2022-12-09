<script lang="ts">
	import type { FeatureBullet } from '$lib/components/landing/features/features-content';

	export let item: FeatureBullet;
</script>

<div class="relative">
	<dt>
		<div
			class="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white"
		>
			<svelte:component this={item.icon} class="h-8 w-8" aria-hidden="true" />
		</div>
		<!-- <p class="ml-16 text-lg font-medium leading-6 text-gray-900"> -->
		<!-- {item.name} -->
		<!-- </p> -->
	</dt>
	<dd class="mt-2 ml-16 text-base text-slate-600">
		{item.text}
	</dd>
</div>
