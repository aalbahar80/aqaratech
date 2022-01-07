<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		ProgressBar,
	} from 'carbon-components-svelte';
	import { getProgress } from '$lib/utils';
	import { formatDistance, parseISO } from 'date-fns';
	import Link from 'carbon-components-svelte/src/Link/Link.svelte';
	import { Launch24 } from 'carbon-icons-svelte';
	import type { TenantIdScreen } from '$routes/tenants/_[id].gql';

	type Leases = NonNullable<TenantIdScreen['tenants_by_pk']>['pastLeases'];
	export let leases: Leases;
	export let loading: boolean;

	const expiryText = (start: string) =>
		formatDistance(parseISO(start), new Date(), {
			addSuffix: true,
		});

	const progress = (start: string, end: string) =>
		getProgress(parseISO(start), parseISO(end), new Date());
</script>

<Accordion skeleton={loading}>
	{#each leases as { id, start_date, end_date, monthly_rent, deposit }, i}
		<AccordionItem size="xl" open={i === 0}>
			<div slot="title">
				<h5>{`Lease #${id}`}</h5>
				<ProgressBar
					hideLabel
					value={progress(start_date, end_date)}
					labelText="Upload status"
					helperText="Expiry: {expiryText(end_date)}"
				/>
			</div>
			<div class="grid grid-cols-1 grid-flow-col items-center">
				<Link
					size="lg"
					icon={Launch24}
					href={`/leases/${id}`}
					sveltekit:prefetch
				>
					Details
				</Link>
				<p class="col-start-1">{`Rent: ${monthly_rent}`}</p>
				<p class="col-start-1">{`Deposit: ${deposit}`}</p>
			</div>
		</AccordionItem>
	{/each}
</Accordion>
