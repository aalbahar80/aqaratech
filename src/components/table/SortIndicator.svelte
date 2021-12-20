<script lang="ts">
	import { order_by } from '$generated/graphql';

	export let sortMode;
	const iconStyle = 'ml-4 text-primary';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
</script>

{#if sortMode === order_by.asc}
	<div class="ml-4 text-primary">
		<Fa icon={faSortUp} size="2x" translateY="0.2" />
	</div>
{:else if sortMode === order_by.desc}
	<div class="ml-4 text-primary">
		<Fa icon={faSortDown} size="2x" translateY="-0.2" />
	</div>
{/if}
