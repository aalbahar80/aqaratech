<script lang="ts">
	import { CheckCircle, X } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let title = 'Success';
	export let close: (() => void) | undefined = undefined;
</script>

<div class="w-60 rounded-md bg-green-100 p-4">
	<div class="flex">
		<div class="flex-shrink-0">
			<Icon
				src={CheckCircle}
				theme="solid"
				class="h-5 w-5 text-green-400"
				aria-hidden="true"
			/>
		</div>
		<div class="ml-3">
			<p class="text-sm font-medium text-green-800">{title}</p>
		</div>
		<div class="ml-auto pl-3">
			<div class="-mx-1.5 -my-1.5">
				<button
					type="button"
					class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
				>
					<span class="sr-only">Dismiss</span>
					<div on:click={close}>
						<Icon src={X} class="h-5 w-5" aria-hidden="true" />
					</div>
				</button>
			</div>
		</div>
	</div>
</div>
