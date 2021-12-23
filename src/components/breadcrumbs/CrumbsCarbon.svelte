<script lang="ts">
	// import Breadcrumb from 'carbon-components-svelte/src/Breadcrumb/Breadcrumb.svelte';
	import { Breadcrumb } from 'carbon-components-svelte';
	import BreadcrumbItem from 'carbon-components-svelte/src/Breadcrumb/BreadcrumbItem.svelte';
	import { Button } from 'carbon-components-svelte';

	// import 'carbon-components-svelte'

	// import 'carbon-components-svelte/css/all.css';
</script>

<Breadcrumb skeleton>
	<BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
	<BreadcrumbItem href="/reports">Annual reports</BreadcrumbItem>
	<BreadcrumbItem href="/reports/2019" isCurrentPage>2019</BreadcrumbItem>
</Breadcrumb>
<p>sdf</p>
<Button>Primary button</Button>

<!-- <style [class^="bx" ]>
	@import 'carbon-components-svelte/css/g100.css';
</style> -->
<!-- <link
	rel="stylesheet"
	href="https://unpkg.com/carbon-components-svelte/css/white.css"
/> -->

<!-- <svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/carbon-components-svelte/css/g100.css"
	/>
</svelte:head> -->

<!-- <style>
	@import 'https://unpkg.com/carbon-components-svelte/css/g100.css';
</style> -->
<style lang="postcss">
	@import 'carbon-components-svelte/css/all';
</style>
