<script lang="ts">
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		SideNav,
		SideNavItems,
		SideNavLink,
		SideNavDivider,
		SkipToContent,
		Theme,
		HeaderUtilities,
		HeaderAction,
		HeaderPanelLink,
		HeaderPanelLinks,
		HeaderGlobalAction,
	} from 'carbon-components-svelte';
	import type { CarbonTheme } from 'carbon-components-svelte/types/Theme/Theme.svelte';
	import { SettingsAdjust20, UserAvatarFilledAlt20 } from 'carbon-icons-svelte';
	import { page } from '$app/stores';

	let isSideNavOpen = false;
	let isAccountOpen = false;
	let theme: CarbonTheme = 'g90';
	let y: number | null | undefined;

	const navLinkList = [
		{ text: 'Clients', href: '/clients' },
		{ text: 'Properties', href: '/properties' },
		{ text: 'Units', href: '/units' },
		{ text: 'Leases', href: '/leases' },
		{ text: 'Tenants', href: '/tenants' },
	];
	$: isActive = (href: string) => $page.url.pathname === href;
	const navBreakpoint = 1056;
	// if y is a number and less than navBreakpoint, then it's mobile
	$: isMobileMenu = y !== undefined && y !== null && y < navBreakpoint;
</script>

<svelte:window bind:innerWidth={y} />

<Header
	company="RE"
	platformName="Admin"
	href="/"
	persistentHamburgerMenu={isMobileMenu}
	expansionBreakpoint={navBreakpoint}
	expandedByDefault={false}
	bind:isSideNavOpen
>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>

	{#if !isMobileMenu}
		<HeaderNav>
			{#each navLinkList as { href, text }}
				<HeaderNavItem {text} {href} isSelected={isActive(href)} />
			{/each}
		</HeaderNav>
	{/if}

	<HeaderUtilities>
		<HeaderGlobalAction aria-label="Settings" icon={SettingsAdjust20} />
		<HeaderAction>
			<Theme
				bind:theme
				persist
				persistKey="__carbon-theme"
				render="select"
				select={{
					themes: ['white', 'g10', 'g80', 'g90', 'g100'],
					labelText: 'Select a theme',
					inline: true,
					hideLabel: true,
				}}
			/>
		</HeaderAction>
		<HeaderAction
			icon={UserAvatarFilledAlt20}
			closeIcon={UserAvatarFilledAlt20}
			bind:isOpen={isAccountOpen}
		>
			<HeaderPanelLinks>
				<HeaderPanelLink>Change password</HeaderPanelLink>
				<HeaderPanelLink href="/auth/login" rel="external"
					>Log in</HeaderPanelLink
				>
				<HeaderPanelLink href="/auth/logout" rel="external"
					>Log out</HeaderPanelLink
				>
			</HeaderPanelLinks>
		</HeaderAction>
	</HeaderUtilities>

	{#if isMobileMenu}
		<SideNav
			bind:isOpen={isSideNavOpen}
			class={isSideNavOpen && (y ?? 0) < 500 ? 'min-w-full' : null}
		>
			<SideNavItems>
				<SideNavLink
					text="Home"
					href="/"
					isSelected={isActive('/')}
					on:click={() => {
						isSideNavOpen = false;
					}}
				/>
				<SideNavDivider />
				{#each navLinkList as { href, text }}
					<SideNavLink
						{text}
						{href}
						isSelected={isActive(href)}
						on:click={() => {
							isSideNavOpen = false;
						}}
					/>
				{/each}
				<SideNavDivider />
			</SideNavItems>
		</SideNav>
	{/if}
</Header>
