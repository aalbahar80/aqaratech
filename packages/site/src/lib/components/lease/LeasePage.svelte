<script lang="ts">
	import Button from '$components/buttons/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { getLeaseBadge } from '$lib/utils/get-badge';
	import { create } from '$lib/utils/route-helpers';
	import type { LeaseDto } from '$api/openapi';
	import { DocumentText, Refresh } from '@steeze-ui/heroicons';
	import { formatDistance } from 'date-fns';
	import Fa6SolidCalendarXmark from '~icons/fa6-solid/calendar-xmark';

	export let lease: LeaseDto;

	const icons = [
		{
			label: `Expiry: ${formatDistance(new Date(lease.end), new Date(), {
				addSuffix: true,
			})}`,
			icon: Fa6SolidCalendarXmark,
			tooltip: 'Bedrooms',
		},
	];

	const badge = getLeaseBadge(lease);
</script>

<Heading title="Lease" id={lease.id} entity="lease" {icons}>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={lease.breadcrumbs} />
	</svelte:fragment>

	<svelte:fragment slot="actions">
		<Button
			icon={Refresh}
			text="Renew"
			as="a"
			href={(function () {
				const base = create({ entity: 'lease' });
				const searchParams = new URLSearchParams({
					tenantId: lease.breadcrumbs.tenant.id,
					portfolioId: lease.breadcrumbs.portfolio.id,
					propertyId: lease.breadcrumbs.property.id,
					unitId: lease.breadcrumbs.unit.id,
				});
				return `${base}?${searchParams.toString()}`;
			})()}
			class="w-full sm:w-auto"
			prefetch
		/>

		<Button
			icon={DocumentText}
			text="Contract"
			as="a"
			href={`/leases/${lease.id}/contract`}
			class="w-full sm:w-auto"
			prefetch
		/>
	</svelte:fragment>
</Heading>
<Badge label={badge.label} badgeColor={badge.color} />
