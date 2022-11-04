<script lang="ts">
	import { classes } from '$lib/utils/classes';

	export let active = false;
</script>

<slot
	cn={classes(
		'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm',
		active
			? 'border-indigo-500 text-indigo-600'
			: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
	)}
/>
