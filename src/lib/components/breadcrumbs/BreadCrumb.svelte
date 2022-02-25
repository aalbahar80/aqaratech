<script lang="ts">
	import { Home } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const pages = [
		{ name: 'Projects', href: '#', current: false },
		{ name: 'Project Nero', href: '#', current: true },
	];
</script>

<nav class="flex" aria-label="Breadcrumb">
	<ol class="flex items-center space-x-4">
		<li>
			<div>
				<a href="_" class="text-gray-400 hover:text-gray-500">
					<Icon
						src={Home}
						theme="solid"
						class="h-5 w-5 flex-shrink-0"
						aria-hidden="true"
					/>
					<span class="sr-only">Home</span>
				</a>
			</div>
		</li>
		{#each pages as page (page.name)}
			<li>
				<div class="flex items-center">
					<svg
						class="h-5 w-5 flex-shrink-0 text-gray-300"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
						aria-hidden="true"
					>
						<path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
					</svg>
					<a
						href={page.href}
						class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
						aria-current={page.current ? 'page' : undefined}
					>
						{page.name}
					</a>
				</div>
			</li>
		{/each}
	</ol>
</nav>
