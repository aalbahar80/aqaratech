<script lang="ts">
	import toast from 'svelte-french-toast';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { withApi } from '$api';
	import { locale } from '$i18n/i18n-svelte';
	import { REDIRECT_TO } from '$lib/constants/misc';
	import { CONTACT_ORG, withLocale } from '$lib/constants/routes';

	async function claimRoles() {
		await withApi(async (api) => {
			const roles = await api.phoneVerify.claimRoles();
			if (roles.roleCount > 0) {
				toast.success(`Claimed ${roles.roleCount} role(s)`, {
					duration: 20000,
				});
				const url = `/${$locale}/users/${$page.data.user.id}/roles`;
				await goto(url, { invalidateAll: true });
			} else if (roles.roleCount === 0) {
				toast(`No roles associated with phone number.`, {
					icon: '⚠️',
					duration: 20000,
				});
				await goto(withLocale(CONTACT_ORG, $locale), { invalidateAll: true });
			}
		});
	}
</script>

<div class="prose flex w-72 flex-col">
	<h1>Claim roles</h1>

	<div class="flex flex-col gap-12">
		<div class="flex flex-col gap-4">
			<p
				class="my-0"
				class:line-through={$page.data.user.isPhoneVerified}
			>
				1. Verify your phone number.
			</p>
			<a
				href={`/${$locale}/users/${
					$page.data.user.id
				}/verify-phone?${REDIRECT_TO}=${`/${$locale}/users/${$page.data.user.id}/claim-roles`}`}
				class="w-full rounded bg-gray-700 px-5 py-1 text-center text-lg font-normal text-white no-underline"
			>
				Verify phone
			</a>
		</div>

		<div class="flex flex-col gap-4">
			<p class="my-0">2. Claim roles associated with your phone number.</p>
			<button
				class="rounded bg-gray-700 px-5 py-1 text-lg text-white disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-white"
				type="button"
				disabled={!$page.data.user.isPhoneVerified}
				on:click={async () => {
					await claimRoles();
				}}>Claim roles</button
			>
		</div>
	</div>
</div>
