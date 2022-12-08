<script lang="ts">
	import { features } from '$lib/components/landing/features/features-content';
	import FeatureBullet from '$lib/components/landing/features-2/FeatureBullet.svelte';
	import DotPatternSm from './DotPatternSm.svelte';
	import DotPattern from './DotPattern.svelte';
</script>

<div class="overflow-hidden bg-gray-50 py-16 lg:py-24">
	<div class="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
		<DotPattern
			patternId="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
			cs="left-full hidden -translate-x-1/2 -translate-y-1/4"
		/>

		<div
			class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8"
		>
			<div class="relative">
				<h3 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
					{features[0].title}
				</h3>

				<dl class="mt-10 space-y-10">
					{#each features[0].bullets as item}
						<FeatureBullet {item} />
					{/each}
				</dl>
			</div>

			<div class="relative -mx-4 mt-10 lg:mt-0" aria-hidden="true">
				<DotPatternSm patternId="ca9667ae-9f92-4be7-abcb-9e3d727f2941" />

				<img
					class="relative mx-auto"
					width={490}
					src="https://tailwindui.com/img/features/feature-example-1.png"
					alt=""
				/>
			</div>
		</div>

		<DotPattern
			patternId="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
			cs="right-full hidden translate-x-1/2 translate-y-12"
		/>

		<div class="relative mt-12 sm:mt-16 lg:mt-24">
			<div
				class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8"
			>
				<div class="lg:col-start-2">
					<h3
						class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
					>
						Always in the loop
					</h3>
					<p class="mt-3 text-lg text-gray-500">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ex
						obcaecati natus eligendi delectus, cum deleniti sunt in labore nihil
						quod quibusdam expedita nemo.
					</p>

					<dl class="mt-10 space-y-10">
						{#each features as item (item.title)}
							<FeatureBullet {item} />
						{/each}
					</dl>
				</div>

				<div class="relative -mx-4 mt-10 lg:col-start-1 lg:mt-0">
					<DotPatternSm patternId="e80155a9-dfde-425a-b5ea-1f6fadd20131" />
					<img
						class="relative mx-auto"
						width={490}
						src="https://tailwindui.com/img/features/feature-example-2.png"
						alt=""
					/>
				</div>
			</div>
		</div>
	</div>
</div>
