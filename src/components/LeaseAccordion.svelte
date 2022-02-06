<script lang="ts">
	import { getProgress } from '$lib/utils/date-utils';
	import { formatDistance, parseISO } from 'date-fns';

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
		<AccordionItem open={i === 0}>
			<div slot="title">
				<h5>{`Lease #${id}`}</h5>
				<ProgressBar
					hideLabel
					value={progress(start_date, end_date)}
					labelText="Upload status"
					helperText="Expiry: {expiryText(end_date)}"
				/>
			</div>
			<div class="grid grid-flow-col grid-cols-1 items-center">
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
