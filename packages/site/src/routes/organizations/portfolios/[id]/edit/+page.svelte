<script lang="ts">
	import PortfolioForm from '$lib/components/portfolio/PortfolioForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PortfolioForm formType="update" data={data.portfolio} />
