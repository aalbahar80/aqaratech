<script lang="ts">
	import { CheckCircle, X, XCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let kind: 'success' | 'error';
	export let title = 'Success';
	export let subtitle: string | undefined = undefined;
	export let close: () => void;
</script>

<div
	class="w-60 rounded-md p-4 print:hidden"
	class:bg-green-100={kind === 'success'}
	class:bg-red-100={kind === 'error'}
>
	<div class="flex">
		<div class="flex-shrink-0 pt-1">
			<div
				class="toast__icon-container"
				class:toast__icon-container--success={kind === 'success'}
				class:toast__icon-container--error={kind === 'error'}
			>
				<Icon
					src={kind === 'success' ? CheckCircle : XCircle}
					theme="solid"
					aria-hidden="true"
				/>
			</div>
		</div>
		<div class="ml-3">
			<h3
				class="text-sm font-medium lg:text-lg"
				class:text-red-800={kind === 'error'}
				class:text-green-800={kind === 'success'}
			>
				{title}
			</h3>
			<div
				class="mt-2 text-sm"
				class:text-red-800={kind === 'error'}
				class:text-green-800={kind === 'success'}
			>
				<p>
					{subtitle}
				</p>
			</div>
		</div>
		<div class="ml-auto pl-3">
			<div class="-mx-1.5 -my-1.5">
				<button
					on:click={close}
					type="button"
					class="toast__button"
					class:toast__button--error={kind === 'error'}
					class:toast__button--success={kind === 'success'}
				>
					<span class="sr-only">Dismiss</span>
					<div>
						<Icon src={X} class="h-5 w-5" aria-hidden="true" />
					</div>
				</button>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.toast__icon-container {
		@apply h-5 w-5;
	}
	.toast__icon-container--success {
		@apply text-green-400;
	}
	.toast__icon-container--error {
		@apply text-red-400;
	}
	.toast__button {
		@apply inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2;
	}
	.toast__button--error {
		@apply bg-red-100 p-1.5 text-red-500 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50;
	}
	.toast__button--success {
		@apply bg-green-100 p-1.5 text-green-500 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50;
	}
</style>
