import type { IconSource } from '@steeze-ui/svelte-icon/types';

export type Option = {
	label: string;
	icon?: IconSource;
	disabled?: boolean;
} & ({ href: string; onClick?: never } | { href?: never; onClick: () => void });
