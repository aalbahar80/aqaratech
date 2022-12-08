<script lang="ts">
	import type { IFeature } from '$lib/components/landing/features-2/features-content';
	import FeatureBullet from '$lib/components/landing/features-2/FeatureBullet.svelte';
	import DotPatternSm from './DotPatternSm.svelte';
	import DotPattern from './DotPattern.svelte';
	import clsx from 'clsx';

	export let id: number;
	export let feature: IFeature;

	const isEven = id % 2 === 0;
</script>

<!-- FIXME handle patternId -->
<DotPattern
	patternId="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
	cs={clsx(
		'hidden',
		isEven && 'right-full translate-x-1/2 translate-y-12',
		!isEven && 'left-full -translate-x-1/2 -translate-y-1/4',
	)}
/>

<div
	class={clsx(
		'lg:grid lg:grid-cols-2 lg:items-center lg:gap-8',
		isEven && 'lg:grid-flow-row-dense',
		!isEven && 'relative mt-12 lg:mt-24 ',
	)}
>
	<div class={clsx(isEven && 'lg:col-start-2', !isEven && 'relative')}>
		<h3 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
			{feature.title}
		</h3>

		<dl class="mt-10 space-y-10">
			{#each feature.bullets as item}
				<FeatureBullet {item} />
			{/each}
		</dl>
	</div>

	<div
		class="relative -mx-4 mt-10 lg:mt-0"
		class:col-start-1={isEven}
		aria-hidden="true"
	>
		<!-- FIXME handle patternId -->
		<DotPatternSm patternId="ca9667ae-9f92-4be7-abcb-9e3d727f2941" />

		<img
			class="relative mx-auto"
			width={490}
			src="https://tailwindui.com/img/features/feature-example-1.png"
			alt=""
		/>
	</div>
</div>
