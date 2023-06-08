<script lang="ts">
	import { page } from '$app/stores';

	import L, { locale } from '$i18n/i18n-svelte';
	import { CLAIM_ROLES } from '$lib/constants/misc';
	import { withLocale } from '$lib/constants/routes';
</script>

<div class="flex flex-col gap-12">
	<p class="ps-1 font-medium tracking-tight text-gray-700">
		{$L.misc.contactOrg()}
		<br />
		<br />
		<span
			class="prose"
			class:hidden={!$page.url.searchParams.has(CLAIM_ROLES)}
		>
			You can also attempt to gain access automatically by clicking
			<a
				data-testid="claim-roles"
				href={withLocale(`/users/${$page.data.user.id}/claim-roles`, $locale)}
			>
				here.
			</a>
		</span>
	</p>
</div>
