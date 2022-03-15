<script lang="ts">
	const steps = [
		{ id: 'Step 1', name: 'Tenant', href: '#', status: 'complete' },
		{ id: 'Step 2', name: 'Unit', href: '#', status: 'current' },
		{ id: 'Step 3', name: 'Lease details', href: '#', status: 'upcoming' },
	];
</script>

<nav aria-label="Progress">
	<ol class="space-y-4 md:flex md:space-y-0 md:space-x-8">
		{#each steps as step (step.name)}
			<li class="md:flex-1">
				{#if step.status === 'complete'}
					<a
						href={step.href}
						class="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
					>
						<span
							class="text-xs font-semibold uppercase tracking-wide text-indigo-600 group-hover:text-indigo-800"
						>
							{step.id}
						</span>
						<span class="text-sm font-medium">{step.name}</span>
					</a>
				{:else if step.status === 'current'}
					<a
						href={step.href}
						class="pl-4 py-2 flex flex-col border-l-4 border-indigo-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
						aria-current="step"
					>
						<span
							class="text-xs text-indigo-600 font-semibold tracking-wide uppercase"
							>{step.id}</span
						>
						<span class="text-sm font-medium">{step.name}</span>
					</a>
				{:else}
					<a
						href={step.href}
						class="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
					>
						<span
							class="text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray-700"
						>
							{step.id}
						</span>
						<span class="text-sm font-medium">{step.name}</span>
					</a>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
