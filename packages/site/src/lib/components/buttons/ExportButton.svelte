<script lang="ts">
	import { Button } from '@brainandbones/skeleton';
	import Fa6SolidFileCsv from '~icons/fa6-solid/file-csv';
</script>

<Button variant="text-accent">
	<svelte:fragment slot="lead">
		<Fa6SolidFileCsv class="h-4 w-4 flex-shrink-0" />
	</svelte:fragment>
	Export All
</Button>
