<script lang="ts">
	export let href: string;
	export let label: string;
</script>

<td
	class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
>
	<a
		{href}
		target="_blank"
		sveltekit:prefetch
		class="text-indigo-600 hover:text-indigo-900"
	>
		{label}
	</a>
</td>
