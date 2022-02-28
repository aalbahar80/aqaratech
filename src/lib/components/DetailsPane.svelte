<script lang="ts">
	import ButtonDropdown from '$components/ButtonDropdown.svelte';
	import type { Option } from '$lib/types';
	import { PaperClip, Pencil, Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	// type Data = NonNullable<InferQueryOutput<`${'tenants' | 'leases'}:read`>>;
	export let details: [string, string | null][];
	export let files: [string, string][] | undefined = undefined;

	const options: Option[] = [
		{ label: 'Update', href: '#', icon: Pencil, type: 'link' },
		{ label: 'Remove', href: '#', icon: Trash, type: 'link' },
	];
</script>

<div class="border-t border-gray-200">
	<dl>
		{#each details as [key, value]}
			<div class="row">
				<dt class="label">{key}</dt>
				<dd class="definition">{value}</dd>
			</div>
		{/each}
		{#if files}
			<div class="row">
				<dt class="label">Files</dt>
				<dd class="definition">
					<ul
						class="divide-y divide-gray-200 rounded-md border border-gray-200"
					>
						{#each files as [key, value]}
							<li
								class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
							>
								<div class="flex w-0 flex-1 items-center">
									<Icon
										src={PaperClip}
										class="h-5 w-5 flex-shrink-0 text-gray-400"
										aria-hidden="true"
									/>
									<span class="ml-2 w-0 flex-1 truncate">{key}</span>
								</div>
								<ButtonDropdown
									class="bottom-10"
									defaultOption={{ label: 'View', href: '#', type: 'link' }}
									{options}
								/>
							</li>
						{/each}
					</ul>
				</dd>
			</div>
		{/if}
	</dl>
</div>

<style lang="postcss">
	.row {
		@apply px-4 py-5 last:rounded-b-md odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6;
	}
	.label {
		@apply text-sm font-medium text-gray-500;
	}
	.definition {
		@apply mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0;
	}
</style>
