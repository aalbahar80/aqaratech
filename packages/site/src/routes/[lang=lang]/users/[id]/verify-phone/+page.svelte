<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { withApi } from '$api';
	import { REDIRECT_TO } from '$lib/constants/misc';
	import { addSuccessToast } from '$lib/stores/toast';

	let phone: string;
	let code: string;

	let isCodeSent = false;
	let showForm = !$page.data.user.isPhoneVerified;
</script>

<div class="prose flex w-72 flex-col">
	<h1>Verify Phone</h1>

	<div class:hidden={!$page.data.user.isPhoneVerified}>
		<p>
			Current verified number: <span class="font-bold"
				>{$page.data.user.phone}</span
			>
		</p>

		<div class="flex flex-col gap-2">
			<button
				class="w-full rounded bg-gray-700 px-5 py-1 text-lg text-white"
				class:hidden={showForm}
				type="button"
				on:click={() => {
					showForm = true;
				}}>Update phone number</button
			>
		</div>
	</div>

	<div
		class="flex flex-col gap-12"
		class:hidden={!showForm}
	>
		<form
			on:submit|preventDefault={async () => {
				await withApi(async (api) => {
					const res = await api.phoneVerify.initiate({
						verifyPhoneDto: { phone: phone },
					});
					isCodeSent = true;
					addSuccessToast(res.message);
				});
			}}
			class="flex flex-col gap-4"
		>
			<p class="my-0">1. Insert phone number</p>
			<label class="flex items-center justify-between">
				Phone
				<input
					bind:value={phone}
					name="phone"
					type="tel"
					class="w-2/3 rounded-md border-gray-300 shadow-sm invalid:border-pink-500 invalid:text-red-600 focus:border-indigo-500 focus:ring-indigo-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 sm:text-sm"
					minlength="8"
					maxlength="8"
				/>
			</label>

			<button
				disabled={!phone || isCodeSent}
				class="rounded bg-gray-700 px-5 py-1 text-lg text-white disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-white"
				>Get Code</button
			>
		</form>

		<form
			class="flex flex-col gap-4"
			on:submit|preventDefault={async () => {
				await withApi(async (api) => {
					const res = await api.phoneVerify.confirm({
						confirmPhoneDto: { phone, code },
					});
					addSuccessToast(res.message);
					const url = $page.url.searchParams.get(REDIRECT_TO);
					if (url) {
						await goto(url);
					}
				});
			}}
		>
			<p class="my-0">2. Insert code</p>
			<label class="flex items-center justify-between">
				Code
				<input
					bind:value={code}
					name="code"
					type="tel"
					class="w-2/3 rounded-md border-gray-300 shadow-sm invalid:border-pink-500 invalid:text-red-600 focus:border-indigo-500 focus:ring-indigo-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none sm:text-sm"
					minlength="6"
					maxlength="6"
					disabled={!isCodeSent}
				/>
			</label>

			<button
				class="rounded bg-gray-700 px-5 py-1 text-lg text-white disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-white"
				disabled={!code}>Submit</button
			>
		</form>
	</div>
</div>
