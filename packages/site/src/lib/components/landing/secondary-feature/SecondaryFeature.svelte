<script lang="ts">
	import clsx from 'clsx';

	import type { ISecondaryFeature } from '$lib/components/landing/secondary-feature/features';

	export let cs: string;
	export let isActive: boolean;
	export let feature: ISecondaryFeature;
</script>

<div class={clsx(cs, !isActive && 'opacity-75 hover:opacity-100')}>
	<div
		class={clsx('w-9 rounded-lg', isActive ? 'bg-blue-600' : 'bg-slate-500')}
	>
		<svelte:component
			this={feature.icon}
			class="h-9 w-9 text-white"
		/>
	</div>
	<h3
		class={clsx(
			'mt-6 text-sm font-medium',
			isActive ? 'text-blue-600' : 'text-slate-600',
		)}
	>
		<slot />
	</h3>
	<p class="font-display mt-2 text-xl text-slate-900">
		{feature.summary}
	</p>
	<p class="mt-4 text-sm text-slate-600">{feature.description}</p>
</div>
