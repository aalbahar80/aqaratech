<script lang="ts">
	import L, { locale } from '$i18n/i18n-svelte';
	import { CLAIM_ROLES } from '$lib/constants/misc';
	import {
		NEW_ORGANIZATION,
		CONTACT_ORG,
		withLocale,
	} from '$lib/constants/routes';
	import { environment } from '$lib/environment';
	import BxsBusiness from '~icons/bxs/business';
	import MdiAccount from '~icons/mdi/account';
	import MdiAccountTie from '~icons/mdi/account-tie';

	const boxClass =
		'flex w-full flex-col items-center justify-center gap-2 rounded border-2 p-4 hover:border-indigo-400 hover:bg-gray-50';
	const iconClass = 'h-10 w-10 text-gray-700';
</script>

<div>
	<div class="flex flex-col gap-1.5 p-6">
		<h3 class="text-lg font-semibold leading-none tracking-tight">
			{$L.other.iAmA()}...
		</h3>
		<p class="text-sm text-gray-700">{$L.other.chooseRole()}</p>
	</div>

	<div class="flex h-36 flex-col justify-stretch gap-12 p-6 pt-0 md:flex-row">
		<a
			class={boxClass}
			href={withLocale(
				CONTACT_ORG +
					(environment.PUBLIC_FEATURE_PHONE_VERIFICATION
						? `?${CLAIM_ROLES}=1`
						: ''),
				$locale,
			)}
		>
			<MdiAccount class={iconClass} />
			{$L.entity.tenant.singular()}
		</a>

		<a
			class={boxClass}
			href={withLocale(CONTACT_ORG, $locale)}
		>
			<MdiAccountTie class={iconClass} />
			{$L.entity.portfolio.singular()}
		</a>

		<a
			class={boxClass}
			href={NEW_ORGANIZATION($locale)}
		>
			<BxsBusiness class={iconClass} />
			{$L.entity.organization.singular()}
		</a>
	</div>
</div>
