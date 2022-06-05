import type { IconSource } from '@steeze-ui/svelte-icon/types';

export interface Option {
	value: string | null | undefined;
	label: string;
}

export type SelectedOption = Option | undefined;

export interface RelationOptions {
	portfolio?: SelectedOption;
	property?: SelectedOption;
	unit?: SelectedOption;
	tenant?: SelectedOption;
	lease?: SelectedOption;
}

export type MenuOption = {
	label: string;
	icon?: IconSource;
	disabled?: boolean;
} & ({ href: string; onClick?: never } | { href?: never; onClick: () => void });
