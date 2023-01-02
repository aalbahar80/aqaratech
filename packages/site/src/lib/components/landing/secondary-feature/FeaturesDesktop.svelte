<script lang="ts">
	import {
		Tab,
		TabList,
		TabPanel,
		TabPanels,
		TabGroup,
	} from '@rgossiaux/svelte-headlessui';
	import clsx from 'clsx';

	import SecondaryFeature from '$lib/components/landing/secondary-feature/SecondaryFeature.svelte';

	import type { ISecondaryFeature } from '$lib/components/landing/secondary-feature/features';

	export let secondaryFeatures: ISecondaryFeature[];
</script>

<!-- FeaturesDesktop -->
<TabGroup
	as="div"
	class="hidden lg:mt-20 lg:block"
	let:selectedIndex
	defaultIndex={1}
>
	<TabList class="grid grid-cols-3 gap-x-8">
		{#each secondaryFeatures as feature, featureIndex (feature.name)}
			<SecondaryFeature
				{feature}
				isActive={featureIndex === selectedIndex}
				cs="relative"
			>
				<Tab class="[&:not(:focus-visible)]:focus:outline-none">
					<span class="absolute inset-0" />
					{feature.name}
				</Tab>
			</SecondaryFeature>
		{/each}
	</TabList>
	<TabPanels
		class="rounded-4xl relative mt-20 overflow-hidden bg-slate-200 px-14 py-16 xl:px-16"
	>
		<div class="-mx-5 flex">
			{#each secondaryFeatures as feature, featureIndex (feature.name)}
				<TabPanel
					static
					class={clsx(
						'px-5 transition duration-500 ease-in-out [&:not(:focus-visible)]:focus:outline-none',
						featureIndex !== selectedIndex && 'opacity-60',
					)}
					style="transform: translateX(-{(selectedIndex ?? 0) * 100}%);"
					aria-hidden={featureIndex !== selectedIndex}
				>
					<div
						class="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10"
					>
						<img class="w-full" src={feature.image} alt="" sizes="52.75rem" />
					</div>
				</TabPanel>
			{/each}
		</div>
		<div
			class="rounded-4xl pointer-events-none absolute inset-0 ring-1 ring-inset ring-slate-900/10"
		/>
	</TabPanels>
</TabGroup>
