<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	import L from '$i18n/i18n-svelte';
	import ActionPanel from '$lib/components/buttons/ActionPanel.svelte';
	import { externalRedirect } from '$lib/components/form/enhanced/external-redirect';

	export let data: PageData;
</script>

<!-- Use the result of lookupPhase to indentify whether an org has cancelled it's subscription -->
{#if data.tierData.phase}
	<ActionPanel>
		<div slot="title">{$L.billing.cancelSubscription()}</div>
		<div slot="content">
			<p>{$L.billing.cancelSubscriptionImmediately()}</p>
		</div>
		<div slot="button">
			<form
				method="POST"
				action="?/unsubscribe"
				data-sveltekit-reload
				rel="external"
				use:enhance
			>
				<button
					class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
					>{$L.billing.cancelSubscription()}</button
				>
			</form>
		</div>
	</ActionPanel>
{:else}
	<ActionPanel>
		<div slot="title">{$L.buttons.subscribe()}</div>
		<div slot="content">
			<p>{$L.billing.activateNewSubscription()}</p>
		</div>
		<div slot="button">
			<form
				method="POST"
				action="?/resubscribe"
				data-sveltekit-reload
				rel="external"
				use:enhance={externalRedirect}
			>
				<div
					class="flex flex-col items-start gap-x-8 gap-y-4 sm:flex-row sm:items-center"
				>
					<div class="flex items-center gap-4">
						<div>
							<input
								type="radio"
								data-testid="plan-1"
								id="plan-1"
								name="plan"
								value="1"
								class="text-indigo-600 focus:ring-indigo-500"
								checked
							/>
							<label
								for="plan-1"
								class="ms-2"
							>
								{$L.landing.pricing.plans['1'].name()}
							</label>
						</div>
						<div>
							<input
								type="radio"
								data-testid="plan-2"
								id="plan-2"
								name="plan"
								value="2"
								class="text-indigo-600 focus:ring-indigo-500"
							/>
							<label
								for="plan-2"
								class="ms-2"
							>
								{$L.landing.pricing.plans['2'].name()}
							</label>
						</div>
					</div>
					<button
						class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
					>
						{$L.buttons.subscribe()}
					</button>
				</div>
			</form>
		</div>
	</ActionPanel>
{/if}

<ActionPanel>
	<div slot="title">{$L.billing.subscriptionSettings()}</div>
	<div slot="content">
		<!-- <p>View your invoices or update your payment method.</p> -->
		<ul class="list-inside list-disc space-y-2 p-2">
			<li>{$L.billing.updatePaymentMethod()}</li>
			<li>{$L.billing.viewInvoices()}</li>
		</ul>
	</div>
	<div slot="button">
		<form
			method="POST"
			action="?/manage"
			data-sveltekit-reload
			rel="external"
			use:enhance={externalRedirect}
		>
			<!-- If an org exists in Stripe, we always render a link to the Stripe billing portal, regardless if the org has an active sub or not -->
			<button
				disabled={!data.existsInStripe}
				class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
				>{$L.billing.subscriptionSettings()}</button
			>
		</form>
	</div>
</ActionPanel>
