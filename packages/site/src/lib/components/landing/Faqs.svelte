<script lang="ts">
	import * as R from 'remeda';

	import backgroundImage from '../../../assets/background-faqs.jpg';

	import L from '$i18n/i18n-svelte';

	const faqs = [
		{ question: $L.landing.faqs['1'].q(), answer: $L.landing.faqs['1'].a() },
		{ question: $L.landing.faqs['2'].q(), answer: $L.landing.faqs['2'].a() },
		{ question: $L.landing.faqs['3'].q(), answer: $L.landing.faqs['3'].a() },
		{ question: $L.landing.faqs['4'].q(), answer: $L.landing.faqs['4'].a() },
		{ question: $L.landing.faqs['5'].q(), answer: $L.landing.faqs['5'].a() },
		{ question: $L.landing.faqs['6'].q(), answer: $L.landing.faqs['6'].a() },
		{ question: $L.landing.faqs['7'].q(), answer: $L.landing.faqs['7'].a() },
		{ question: $L.landing.faqs['8'].q(), answer: $L.landing.faqs['8'].a() },
		{ question: $L.landing.faqs['9'].q(), answer: $L.landing.faqs['9'].a() },
	];
</script>

<section
	id="faq"
	aria-labelledby="faq-title"
	class="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
>
	<img
		class="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
		src={backgroundImage}
		alt=""
		width={1558}
		height={946}
	/>
	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2
				id="faq-title"
				class="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
			>
				{$L.landing.faqs.title()}
			</h2>
			<p class="mt-4 text-lg tracking-tight text-slate-700">
				{$L.landing.faqs.subtitle()}
			</p>
		</div>
		<ul
			class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
		>
			{#each R.chunk(faqs, 3) as column, columnIndex (columnIndex)}
				<li>
					<ul class="flex flex-col gap-y-8">
						{#each column as faq, faqIndex (faqIndex)}
							<li>
								<h3 class="font-display text-lg leading-7 text-slate-900">
									{faq.question}
								</h3>
								<p class="mt-4 text-sm text-slate-700">{faq.answer}</p>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</div>
</section>
