<script lang="ts">
	import { classes } from '$lib/utils/classes';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { IconSource } from '@steeze-ui/svelte-icon/types';

	interface ITab {
		name: string;
		icon: IconSource;
	}

	export let tabs: readonly ITab[];
	export let tab: string;
</script>

<div>
	<div class="sm:hidden">
		<label for="tabs" class="sr-only"> Select a tab </label>
		<select
			id="tabs"
			name="tabs"
			class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
			bind:value={tab}
		>
			{#each tabs as { name } (name)}
				<option>{name}</option>
			{/each}
		</select>
	</div>
	<div class="hidden sm:block">
		<div class="border-b border-gray-200">
			<nav class="-mb-px flex flex-row-reverse gap-x-8" aria-label="Tabs">
				{#each tabs as { name, icon } (name)}
					{@const current = tab === name}
					<button
						on:click={() => (tab = name)}
						class={classes(
							current
								? 'border-indigo-500 text-indigo-600'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
							'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium',
						)}
						aria-current={current ? 'page' : undefined}
					>
						<Icon
							src={icon}
							theme="solid"
							class={classes(
								current
									? 'text-indigo-500'
									: 'text-gray-400 group-hover:text-gray-500',
								'-ml-0.5 mr-2 h-5 w-5',
							)}
							aria-hidden="true"
						/>
						<span>{name}</span>
					</button>
				{/each}
			</nav>
		</div>
	</div>
</div>
