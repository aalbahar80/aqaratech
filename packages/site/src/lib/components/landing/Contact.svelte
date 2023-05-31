<script lang="ts">
	import L from '$i18n/i18n-svelte';
</script>

<div class="mt-20 border-t border-gray-200">
	<div class="mx-auto max-w-md px-6 py-20 sm:max-w-3xl lg:max-w-7xl lg:px-8">
		<div class="divide-y divide-slate-200">
			<section
				class="lg:grid lg:grid-cols-3 lg:gap-8"
				aria-labelledby="contact-heading"
			>
				<h2
					id="contact-heading"
					class="text-3xl tracking-tight text-slate-900 sm:text-4xl"
				>
					{$L.buttons.contact()}
				</h2>
				<div
					class="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:col-span-2 lg:mt-0"
				>
					<!-- Location -->
					<div>
						<h3 class="text-lg font-medium text-slate-900">
							{$L.landing.location()}
						</h3>
						<div class="mt-2 flex flex-col gap-2 text-base text-slate-500">
							<p>
								{$L.aqaratech.address.line1()} <br />
								{$L.aqaratech.address.line2()}
							</p>
							<a
								class="underline hover:text-slate-900"
								href="https://goo.gl/maps/8v94cnqcoFJxJvc57"
								data-sveltekit-reload
								target="_blank noopener noreferrer"
							>
								{$L.landing.map()}
							</a>
						</div>
					</div>

					<!-- Phone -->
					<div>
						<h3 class="text-lg font-medium text-slate-900">
							{$L.general.phone()}
						</h3>
						<div class="mt-2 text-base text-slate-500">
							<a
								dir="auto"
								class="hover:text-slate-900"
								href="tel:+96522466664"
								data-sveltekit-reload>+965 22466664</a
							>
						</div>
					</div>

					<!-- Online -->
					<div>
						<h3 class="text-lg font-medium text-slate-900">
							{$L.general.online()}
						</h3>
						<div class="mt-2 text-base text-slate-500">
							<a
								href="https://ojab1kn3vda.typeform.com/to/eet5fojG"
								target="_blank"
								rel="noopener noreferrer external"
								data-sveltekit-reload
								type="submit"
								class="hover:text-slate-900"
							>
								{$L.buttons.contact()}
							</a>
						</div>
					</div>

					<!-- WhatsApp -->
					<div>
						<h3 class="text-lg font-medium text-slate-900">
							{$L.other.whatsapp()}
						</h3>
						<div class="mt-2 text-base text-slate-500">
							<a
								dir="auto"
								class="hover:text-slate-900"
								href="https://wa.me/+96597944943"
								data-sveltekit-reload
								rel="external"
								target="_blank noopener noreferrer">+965 97944943</a
							>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
