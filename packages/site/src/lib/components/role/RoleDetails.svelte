<script lang="ts">
	import type { ValidatedRoleDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';

	export let role: ValidatedRoleDto;

	const input = new Map([
		[$L.entity.organization.singular(), role.organization.title],
		[$L.entity.portfolio.singular(), role.portfolio?.title],
		[$L.entity.tenant.singular(), role.tenant?.title],
	]);
</script>

<ul class="inline-flex flex-1 flex-col gap-2">
	{#each Array.from(input) as [key, value]}
		{#if value}
			<li>
				<span class="text-sm font-medium text-indigo-500">{key}:</span>
				<span class="text-sm text-gray-600">{value}</span>
			</li>
		{/if}
	{/each}
</ul>
