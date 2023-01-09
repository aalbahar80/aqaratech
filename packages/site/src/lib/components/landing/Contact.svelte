<script lang="ts">
	// eslint-disable-next-line import/no-named-as-default
	import LL from '$i18n/i18n-svelte';
</script>

<div>
	<div
		class="mx-auto max-w-md py-24 px-6 sm:max-w-3xl sm:py-32 lg:max-w-7xl lg:px-8"
	>
		<div class="divide-y divide-slate-200">
			<section
				class="lg:grid lg:grid-cols-3 lg:gap-8"
				aria-labelledby="contact-heading"
			>
				<h2
					id="contact-heading"
					class="text-3xl tracking-tight text-slate-900 sm:text-4xl"
				>
					Get in touch
				</h2>
				<div
					class="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:col-span-2 lg:mt-0"
				>
					<!-- Location -->
					<div>
						<h3 class="text-lg font-medium text-slate-900">Location</h3>
						<div class="mt-2 text-base text-slate-500">
							<p>
								25 Alshuhada St, Sulaiman Tower <br />
								Sharq, 15305, Kuwait
							</p>
							<a
								class="mt-1"
								href="https://goo.gl/maps/8v94cnqcoFJxJvc57"
								data-sveltekit-reload
								target="_blank noopener noreferrer"
							>
								View on Google Maps
							</a>
						</div>
					</div>

					<!-- Phone -->
					<div>
						<h3 class="text-lg font-medium text-slate-900">Phone</h3>
						<div class="mt-2 text-base text-slate-500">
							<!-- TODO: add data-sveltekit-reload? -->
							<a class="mt-1" href="tel:+96522466664">+965 22466664</a>
						</div>
					</div>

					<!-- Online -->
					<div>
						<h3 class="text-lg font-medium text-slate-900">Online</h3>
						<div class="mt-2 text-base text-slate-500">
							<a
								href="https://ojab1kn3vda.typeform.com/to/eet5fojG"
								target="_blank"
								rel="noopener noreferrer external"
								data-sveltekit-reload
								type="submit"
								class="mt-1"
							>
								{$LL.buttons.contact()}
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
