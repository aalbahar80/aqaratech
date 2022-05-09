import type { IconSource } from '@steeze-ui/svelte-icon/types';

export interface Option {
	value: string | undefined;
	label: string | undefined;
}

export type SelectedOption = Option | undefined;

export interface RelationOptions {
	client?: SelectedOption;
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
