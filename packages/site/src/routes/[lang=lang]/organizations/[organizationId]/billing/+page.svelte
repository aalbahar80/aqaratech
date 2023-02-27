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
				<button
					class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
				>
					{$L.buttons.subscribe()}
				</button>
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
