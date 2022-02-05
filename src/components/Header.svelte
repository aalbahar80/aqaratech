<script lang="ts">
	import { page, session } from '$app/stores';
	import {
		Header,
		HeaderGlobalAction,
		HeaderNav,
		HeaderNavItem,
		HeaderUtilities,
		SideNav,
		SideNavDivider,
		SideNavItems,
		SideNavLink,
		SkipToContent,
		Theme,
	} from 'carbon-components-svelte';
	import type { CarbonTheme } from 'carbon-components-svelte/types/Theme/Theme.svelte';
	import { BrightnessContrast32 } from 'carbon-icons-svelte';

	const themes: CarbonTheme[] = ['white', 'g10', 'g80', 'g90', 'g100'];
	let themeIndex = 4;
	$: theme = themes[themeIndex];

	let isSideNavOpen = false;
	let y: number | null | undefined;

	const navLinkList = [
		{ text: 'Clients', href: '/clients' },
		{ text: 'Properties', href: '/properties' },
		{ text: 'Units', href: '/units' },
		{ text: 'Leases', href: '/leases' },
		{ text: 'Tenants', href: '/tenants' },
		{ text: 'Transactions', href: '/transactions' },
		{ text: 'prismatenants', href: '/prismatenants/all' },
		{ text: 'ptenants', href: '/ptenants' },
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

	<Theme bind:theme persist persistKey="__carbon-theme" />
	{#if !isMobileMenu}
		<HeaderNav>
			{#each navLinkList as { href, text }}
				<HeaderNavItem {text} {href} isSelected={isActive(href)} />
			{/each}
		</HeaderNav>
	{/if}

	<HeaderUtilities>
		<HeaderNav />
		<HeaderGlobalAction
			aria-label="Settings"
			icon={BrightnessContrast32}
			on:click={() => {
				themeIndex = (themeIndex + 1) % themes.length;
			}}
		/>
		{#if !$session.userId}
			<a
				role="menuitem"
				tabindex="0"
				href="/auth/login"
				rel="external"
				class:bx--header__menu-item={true}
			>
				<span class:bx--text-truncate--end={true}>Sign In</span>
			</a>
		{:else}
			<a
				role="menuitem"
				tabindex="0"
				href="/auth/logout"
				rel="external"
				class:bx--header__menu-item={true}
			>
				<span class:bx--text-truncate--end={true}>Sign Out</span>
			</a>
		{/if}
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

<style>
	:global(a.bx--side-nav__link > .bx--side-nav__link-text, .bx--side-nav
			a.bx--header__menu-item
			.bx--text-truncate-end) {
		@apply text-2xl py-2;
	}
</style>
