<script lang="ts">
	import { page } from '$app/stores';

	import type { SearchableEntityEnum } from '$api/openapi';

	import L, { locale } from '$i18n/i18n-svelte';
	import HeroiconsGlobeAlt from '~icons/heroicons/globe-alt';

	const searchableEntities: SearchableEntityEnum[] =
		$page.data.user?.role?.roleType === 'ORGADMIN'
			? ['tenant', 'portfolio', 'property']
			: ['tenant', 'property'];

	const localizedEntities = searchableEntities.map((e) =>
		$L.entity[e].plural(),
	);

	const localizedList = new Intl.ListFormat($locale, {
		style: 'long',
		type: 'disjunction',
	}).format(localizedEntities);
</script>

<div class="border-t border-gray-100 py-14 px-6 text-center text-sm sm:px-14">
	<HeroiconsGlobeAlt class="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
	<p class="mt-4 font-semibold text-gray-900">
		{$L.search.titlePrefix()}
		{localizedList}
	</p>
	<p class="mt-2 text-gray-500">
		{$L.search.subtitle()}
	</p>
</div>
