<script lang="ts">
	// eslint-disable-next-line import/no-named-as-default
	import LL from '$i18n/i18n-svelte';
</script>

<div>
	<div
		class="mx-auto max-w-md py-24 px-6 sm:max-w-3xl sm:py-32 lg:max-w-7xl lg:px-8"
	>
		<div class="divide-warm-gray-200 divide-y">
			<section
				class="lg:grid lg:grid-cols-3 lg:gap-8"
				aria-labelledby="contact-heading"
			>
				<h2
					id="contact-heading"
					class="text-warm-gray-900 text-2xl font-bold sm:text-3xl sm:tracking-tight"
				>
					Get in touch
				</h2>
				<div
					class="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:col-span-2 lg:mt-0"
				>
					<!-- Location -->
					<div>
						<h3 class="text-warm-gray-900 text-lg font-medium">Location</h3>
						<div class="text-warm-gray-500 mt-2 text-base">
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
						<h3 class="text-warm-gray-900 text-lg font-medium">Phone</h3>
						<div class="text-warm-gray-500 mt-2 text-base">
							<!-- TODO: add data-sveltekit-reload? -->
							<a class="mt-1" href="tel:+96522466664">+965 22466664</a>
						</div>
					</div>

					<!-- Online -->
					<div>
						<h3 class="text-warm-gray-900 text-lg font-medium">Online</h3>
						<div class="text-warm-gray-500 mt-2 text-base">
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
