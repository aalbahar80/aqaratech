<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	import ActionPanel from '$lib/components/buttons/ActionPanel.svelte';

	export let data: PageData;
</script>

<!-- Use the result of lookupPhase to indentify whether an org has cancelled it's subscription -->
{#if data.tierData.phase}
	<ActionPanel>
		<div slot="title">Cancel subscription</div>
		<div slot="content">
			<p>Immediately cancel your subscription.</p>
		</div>
		<div slot="button">
			<form
				method="POST"
				use:enhance
				action="?/unsubscribe"
				data-sveltekit-reload
			>
				<button
					class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
				>
					Cancel subscription
				</button>
			</form>
		</div>
	</ActionPanel>
{:else}
	<ActionPanel>
		<div slot="title">Subscribe</div>
		<div slot="content">
			<p>Activate a new subscription.</p>
		</div>
		<div slot="button">
			<form
				method="POST"
				use:enhance
				action="?/resubscribe"
				data-sveltekit-reload
			>
				<button
					class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
				>
					Subscribe
				</button>
			</form>
		</div>
	</ActionPanel>
{/if}

<ActionPanel>
	<div slot="title">Manage payment</div>
	<div slot="content">
		<p>View your invoices or update your payment method.</p>
	</div>
	<div slot="button">
		<form method="POST" use:enhance action="?/manage" data-sveltekit-reload>
			<!-- If an org exists in Stripe, we always render a link to the Stripe billing portal, regardless if the org has an active sub or not -->
			<button
				disabled={!data.existsInStripe}
				class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
			>
				Manage payment
			</button>
		</form>
	</div>
</ActionPanel>
