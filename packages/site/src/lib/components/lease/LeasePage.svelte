<script lang="ts">
	import { formatDistance } from 'date-fns';

	import { page } from '$app/stores';
	import { getRoute, PageTab, PageType } from '@self/utils';

	import type { LeaseDto } from '$api/openapi';

	import Button from '$components/buttons/Button.svelte';
	import L, { locale } from '$i18n/i18n-svelte';
	import Badge from '$lib/components/Badge.svelte';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { dateFnsLocale } from '$lib/i18n/date-fns-locale';
	import { getLeaseBadge } from '$lib/utils/get-badge';
	import RoleGuard from '$lib/utils/RoleGuard.svelte';
	import Fa6SolidCalendarXmark from '~icons/fa6-solid/calendar-xmark';
	import HeroiconsArrowPath from '~icons/heroicons/arrow-path';
	import HeroiconsDocumentText from '~icons/heroicons/document-text';

	export let lease: LeaseDto;

	const icons = [
		{
			label: `${$L.badge.expiry()}: ${formatDistance(
				new Date(lease.end),
				new Date(),
				{
					locale: dateFnsLocale($locale),
					addSuffix: true,
				},
			)}`,
			icon: Fa6SolidCalendarXmark,
			tooltip: 'Bedrooms',
		},
	];

	const badge = getLeaseBadge(lease);
</script>

<Heading
	title={$L.entity.lease.singular()}
	id={lease.id}
	entity="lease"
	{icons}
	onDelete={async (api) => {
		await api.leases.remove({ id: lease.id });

		const url = getRoute({
			entity: 'unit',
			id: lease.unitId,
			pageType: PageTab.Leases,
			params: $page.params,
		});

		return url;
	}}
>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={lease.breadcrumbs} />
	</svelte:fragment>

	<svelte:fragment slot="actions">
		<RoleGuard roles={['ORGADMIN']}>
			<Button
				icon={HeroiconsArrowPath}
				text={$L.buttons.renew()}
				as="a"
				href={getRoute({
					entity: 'lease',
					pageType: PageType.New,
					params: $page.params,
					predefined: {
						unitId: lease.unitId,
						leaseId: lease.id,
					},
				})}
				class="w-full sm:w-auto"
				prefetch
			/>
		</RoleGuard>

		<RoleGuard roles={['ORGADMIN']}>
			<Button
				icon={HeroiconsDocumentText}
				text={$L.buttons.contract()}
				as="a"
				href={getRoute({
					entity: 'lease',
					pageType: PageTab.Contract,
					id: lease.id,
					params: $page.params,
				})}
				class="w-full sm:w-auto"
				prefetch
			/>
		</RoleGuard>
	</svelte:fragment>
</Heading>

<Badge label={badge.label} badgeColor={badge.color} />
