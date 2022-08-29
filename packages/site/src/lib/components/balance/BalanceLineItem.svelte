<script lang="ts">
	import { classes } from '$lib/utils/classes';

	export let href: string | undefined = undefined;
</script>

<li class="justify-between odd:bg-gray-50 even:bg-white">
	<a
		{href}
		class={classes(
			'flex items-center justify-between p-4 text-gray-500 sm:px-6',
			href ? 'hover:bg-gray-100' : '',
		)}
	>
		<dt class="text-sm font-medium">
			<slot name="label" />
		</dt>
		<dd class="text-sm font-medium tabular-nums">
			<slot name="definition" />
		</dd>
	</a>
</li>
