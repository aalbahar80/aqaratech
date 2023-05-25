<script lang="ts">
	import clsx from 'clsx';

	import L from '$i18n/i18n-svelte';
	import { buttonCn } from '$lib/components/landing/button-cn';
	import HeroiconsCheckCircle from '~icons/heroicons/check-circle';

	interface Plan {
		name: string;
		price: string;
		description: string;
		href: string;
		features: string[];
		featured?: boolean;
	}

	export let plan: Plan;
	export let cs: string;
</script>

<section
	class={clsx(
		'flex flex-col rounded-3xl px-6 sm:px-8 only:lg:col-start-2',
		plan.featured ? 'py-8 lg:order-none' : 'lg:py-8',
		cs,
	)}
>
	<h3 class="font-display mt-5 text-lg text-white">{plan.name}</h3>
	<p
		class={clsx(
			'mt-2 text-base',
			plan.featured ? 'text-white' : 'text-slate-400',
		)}
	>
		{plan.description}
	</p>
	<p
		class="font-display order-first text-5xl font-light tracking-tight text-white"
	>
		{plan.price}
	</p>
	<ul
		class={clsx(
			'order-last mt-10 flex flex-col gap-y-3 text-sm',
			plan.featured ? 'text-white' : 'text-slate-200',
		)}
	>
		{#each plan.features as feature (feature)}
			<li class="flex">
				<HeroiconsCheckCircle
					class={plan.featured ? 'text-white' : 'text-slate-400'}
				/>
				<span class="ms-4">{feature}</span>
			</li>
		{/each}
	</ul>
	<a
		href={plan.href}
		class={buttonCn({
			cs: 'mt-8',
			color: 'white',
			variant: plan.featured ? 'solid' : 'outline',
		})}
		aria-label={`Get started with the ${plan.name} plan for ${plan.price}`}
	>
		{$L.landing.callToAction.button()}
	</a>
</section>
