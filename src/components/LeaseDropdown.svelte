<script lang="ts">
	import type { Leases } from '$generated/graphql';
	import { formatDateDiff, progress } from '$lib/utils';
	import TransactionRow from './TransactionRow.svelte';

	export let lease;
	console.log(lease);
</script>

<div
	class="border collapse rounded-box border-base-200 collapse-arrow bg-base-200 collapse-open"
>
	<input type="checkbox" />
	<div class="text-xl font-medium collapse-title">
		{`Lease #${lease.id}`}
		<progress
			class="progress progress-primary"
			value={`${progress(lease.end_date, lease.start_date)}`}
			max="100"
		/>
	</div>
	<div class="collapse-content">
		<div class="grid w-full grid-cols-1">
			<div class="grid grid-cols-3">
				<div class="bg-transparent stat">
					<div class="stat-title">
						{lease.is_expired ? 'Expired' : 'Expires in'}
					</div>
					<div class="stat-value">
						{formatDateDiff(lease.end_date).main}
					</div>
					<div class="stat-desc">
						{formatDateDiff(lease.end_date).unit}
						{lease.is_expired ? ' ago' : ''}
					</div>
				</div>
				<div class="bg-transparent stat">
					<div class="stat-figure text-secondary" />
					<div class="stat-title">Balance</div>
					<div class="stat-value text-error">4,200</div>
					<div class="stat-desc">KD</div>
				</div>
				<div class="items-center bg-transparent stat">
					<a href="/leases/{lease.id}" class="text-base btn btn-ghost"
						>Details</a
					>
				</div>
			</div>
			{#each lease.transactions as trx (trx.id)}
				<TransactionRow {trx} />
			{/each}
		</div>
	</div>
</div>
