<script lang="ts">
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderNavMenu,
		SideNav,
		SideNavItems,
		SideNavMenu,
		SideNavMenuItem,
		SideNavLink,
		SideNavDivider,
		SkipToContent,
		Theme,
	} from 'carbon-components-svelte';
	import type { CarbonTheme } from 'carbon-components-svelte/types/Theme/Theme.svelte';

	let isSideNavOpen = false;
	let theme: CarbonTheme = 'g90';
	let y: number | null | undefined;

	const navLinkList = [
		{ text: 'Clients', href: '/clients' },
		{ text: 'Properties', href: '/properties' },
		{ text: 'Units', href: '/units' },
		{ text: 'Leases', href: '/leases' },
		{ text: 'Tenants', href: '/tenants' },
	];
</script>

<svelte:window bind:outerWidth={y} />

<Header
	company="RE"
	platformName="Admin"
	persistentHamburgerMenu
	bind:isSideNavOpen
>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>

	<HeaderNav>
		{#each navLinkList as { href, text }}
			<HeaderNavItem {text} {href} />
		{/each}
		<Theme
			bind:theme
			persist
			persistKey="__carbon-theme"
			render="select"
			select={{
				themes: ['white', 'g10', 'g80', 'g90', 'g100'],
				labelText: 'Select a theme',
				// inline: true,
				hideLabel: true,
			}}
		/>
	</HeaderNav>

	<SideNav bind:isOpen={isSideNavOpen}>
		<SideNavItems>
			<SideNavLink text="Home" href="/" />
			<SideNavDivider />
			{#each navLinkList as { href, text }}
				<SideNavLink {text} {href} />
			{/each}
			<SideNavDivider />
		</SideNavItems>
	</SideNav>
</Header>
