<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		ProgressBar,
	} from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import { TenantPastLeasesDocument } from '$routes/tenants/_[id].gql';
	import { operationStore, query } from '@urql/svelte';
	import { getProgress } from '$lib/utils';
	import { formatDistance, parseISO } from 'date-fns';
	import Link from 'carbon-components-svelte/src/Link/Link.svelte';

	import { Launch24 } from 'carbon-icons-svelte';

	$: id = parseInt($page.params.id);
	$: console.log(id);

	const leases = operationStore(TenantPastLeasesDocument, { id });
	query(leases);

	// reassign query variables to retrigger query
	$: leases.variables = { id };

	const expiryText = (start) => {
		return formatDistance(parseISO(start), new Date(), {
			addSuffix: true,
		});
	};

	const progress = (start, end) => {
		return getProgress(parseISO(start), parseISO(end), new Date());
	};
</script>

<Accordion skeleton={$leases.fetching}>
	{#each $leases.data?.tenants_by_pk?.pastLeases as { id, start_date, end_date, monthly_rent, deposit }, i}
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
