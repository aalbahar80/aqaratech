<script lang="ts">
	import { classes } from '$lib/utils/classes';
	import {
		CreditCard,
		OfficeBuilding,
		User,
		Users,
	} from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const tabs = [
		{ name: 'My Account', href: '#', icon: User, current: false },
		{ name: 'Company', href: '#', icon: OfficeBuilding, current: false },
		{ name: 'Team Members', href: '#', icon: Users, current: true },
		{ name: 'Billing', href: '#', icon: CreditCard, current: false },
	];
</script>

<div>
	<div class="sm:hidden">
		<label for="tabs" class="sr-only"> Select a tab </label>
		<!-- {/* Use an "onChange" listener to redirect the user to the selected tab URL. */} -->
		<select
			id="tabs"
			name="tabs"
			class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
			defaultValue={tabs.find((tab) => tab.current).name}
		>
			{#each tabs as tab (tab.name)}
				<option>{tab.name}</option>
			{/each}
		</select>
	</div>
	<div class="hidden sm:block">
		<div class="border-b border-gray-200">
			<nav class="-mb-px flex space-x-8" aria-label="Tabs">
				{#each tabs as tab (tab.name)}
					<a
						href={tab.href}
						class={classes(
							tab.current
								? 'border-indigo-500 text-indigo-600'
								: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
							'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
						)}
						aria-current={tab.current ? 'page' : undefined}
					>
						<Icon
							src={tab.icon}
							theme="solid"
							class={classes(
								tab.current
									? 'text-indigo-500'
									: 'text-gray-400 group-hover:text-gray-500',
								'-ml-0.5 mr-2 h-5 w-5',
							)}
							aria-hidden="true"
						/>
						<span>{tab.name}</span>
					</a>
				{/each}
			</nav>
		</div>
	</div>
</div>
