<script lang="ts">
	export let trx;
</script>

<div class="flex justify-evenly">
	<a href={`/transactions/${trx.id}`}>{trx.id}</a>
	<p>{trx.due_date}</p>
	<p>{trx.amount}</p>
	<p>{trx.due_date}</p>
	<p>{trx.due_date}</p>
	{#if trx.is_paid}
		<div class="badge badge-success">paid</div>
	{:else}
		<div class="badge badge-error">unpaid</div>
	{/if}
</div>
