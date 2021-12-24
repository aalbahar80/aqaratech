<script lang="ts">
	// import Breadcrumb from 'carbon-components-svelte/src/Breadcrumb/Breadcrumb.svelte';
	import { Breadcrumb } from 'carbon-components-svelte';
	import BreadcrumbItem from 'carbon-components-svelte/src/Breadcrumb/BreadcrumbItem.svelte';
	import { Button } from 'carbon-components-svelte';
</script>

<Breadcrumb skeleton>
	<BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
	<BreadcrumbItem href="/reports">Annual reports</BreadcrumbItem>
	<BreadcrumbItem href="/reports/2019" isCurrentPage>2019</BreadcrumbItem>
</Breadcrumb>
<p>sdf</p>
<Button>Primary button</Button>
