<script lang="ts">
	import type { LeaseDto } from '$api/openapi';
	import { page } from '$app/stores';
	import Badge from '$components/Badge.svelte';
	import { getProgress } from '$lib/utils/common';
	import { getLeaseBadge } from '$lib/utils/get-badge';
	import { getRoute } from '$lib/utils/route-helpers/get-route';
	import { PageType } from '$lib/utils/route-helpers/route-helpers.type';
	import { Calendar, Home, User } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { formatDistance } from 'date-fns';

	export let lease: LeaseDto;
	export let index: number | undefined = undefined;

	const expired = new Date(lease.end) < new Date();

	const badge = getLeaseBadge(lease);
	const progress = getProgress(lease.start, lease.end);
</script>

<a
	href={getRoute({
		entity: 'lease',
		id: lease.id,
		pageType: PageType.Id,
		params: {
			...$page.params,
			portfolioId: lease.portfolioId,
		},
	})}
	class="block hover:bg-gray-50"
>
	<div class="px-4 py-4 sm:px-6">
		<div class="flex flex-row-reverse items-center justify-between">
			<div class="ml-2 flex flex-shrink-0">
				<Badge label={badge.label} badgeColor={badge.color} />
			</div>
			{#if index}
				<p class="truncate text-sm font-medium text-indigo-600">
					# {index}
				</p>
			{/if}
		</div>
		<div class="mt-2 sm:flex sm:justify-between">
			<!-- Tenant/Unit Icons -->
			<div class="flex flex-col gap-2">
				<p class="flex items-center text-sm text-gray-500">
					<Icon
						src={User}
						theme="solid"
						class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
						aria-hidden="true"
					/>
					{lease.breadcrumbs.tenant.label}
				</p>
				<p class="flex items-center text-sm text-gray-500">
					<Icon
						src={Home}
						class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
						aria-hidden="true"
					/>
					{lease.breadcrumbs.property.label}
					{lease.breadcrumbs.unit.label}
				</p>
			</div>

			<!-- Calendar Icon -->
			<div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
				<Icon
					src={Calendar}
					class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
					aria-hidden="true"
				/>
				<p>
					Expiry: <time dateTime={lease.end}
						>{formatDistance(new Date(lease.end), new Date(), {
							addSuffix: true,
						})}</time
					>
				</p>
			</div>
		</div>
		<div
			class="mt-4 animate-pulse overflow-hidden rounded-full bg-gray-200"
			class:animate-pulse={progress === 0}
			style={`visibility: ${!expired ? 'visible' : 'hidden'};`}
		>
			<div
				class="h-1 rounded-full bg-indigo-600"
				style:width={`${progress}%`}
			/>
		</div>
	</div>
</a>
