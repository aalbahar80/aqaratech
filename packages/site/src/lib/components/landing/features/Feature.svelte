<script lang="ts">
	import clsx from 'clsx';

	import FeatureBullet from '$lib/components/landing/features/FeatureBullet.svelte';
	import type { IFeature } from '$lib/components/landing/features/features-content';

	export let id: number;
	export let feature: IFeature;

	const isEven = id % 2 === 0;
</script>

<!-- <DotPattern -->
<!-- 	patternId={`feature-lg-${id}`} -->
<!-- 	cs={clsx( -->
<!-- 		'hidden', -->
<!-- 		isEven && 'right-full translate-x-1/2 translate-y-12', -->
<!-- 		!isEven && 'left-full -translate-x-1/2 -translate-y-1/4', -->
<!-- 	)} -->
<!-- /> -->

<div
	class={clsx(
		'mt-24 lg:mt-44 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8',
		isEven && 'lg:grid-flow-row-dense',
		!isEven && 'relative',
	)}
>
	<div class={clsx(isEven && 'lg:col-start-2', !isEven && 'relative')}>
		<h3 class="text-3xl tracking-tight text-slate-900 sm:text-4xl">
			{feature.title}
		</h3>

		<dl class="mt-10 space-y-10">
			{#each feature.bullets as item}
				<FeatureBullet {item} />
			{/each}
		</dl>
	</div>

	<div
		class="relative -mx-4 my-32 lg:my-0"
		class:col-start-1={isEven}
		aria-hidden="true"
	>
		<!-- <DotPatternSm patternId={`feature-sm-${id}`} /> -->

		<img
			class="relative mx-auto"
			width={290}
			src={feature.image}
			alt={`${feature.title} illustration`}
		/>
	</div>
</div>
