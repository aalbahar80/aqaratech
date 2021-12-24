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

	const navLinkList = [
		{ text: 'Clients', href: '/clients' },
		{ text: 'Properties', href: '/properties' },
		{ text: 'Units', href: '/units' },
		{ text: 'Leases', href: '/leases' },
		{ text: 'Tenants', href: '/tenants' },
	];
</script>

<Header company="RE" platformName="Admin" bind:isSideNavOpen>
	<div slot="skip-to-content">
		<SkipToContent />
	</div>

	<HeaderNav>
		<HeaderNavItem href="/" text="Link 1" />
		<HeaderNavItem href="/" text="Link 2" />
		<HeaderNavItem href="/" text="Link 3" />
		<HeaderNavMenu text="Menu">
			<HeaderNavItem href="/" text="Link 1" />
			<HeaderNavItem href="/" text="Link 2" />
			<HeaderNavItem href="/" text="Link 3" />
		</HeaderNavMenu>
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
		<HeaderNavItem href="/" text="Link 4" />
	</HeaderNav>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavLink text="Home" href="/" />
		<SideNavDivider />
		{#each navLinkList as { href, text }}
			<SideNavLink {text} {href} />
		{/each}
		<SideNavDivider />
		<SideNavMenu text="Dashboards">
			<SideNavMenuItem href="/" text="Link 1" />
			<SideNavMenuItem href="/" text="Link 2" />
			<SideNavMenuItem href="/" text="Link 3" />
		</SideNavMenu>
	</SideNavItems>
</SideNav>
