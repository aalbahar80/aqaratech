import type { IconSource } from '@steeze-ui/svelte-icon/types';

interface OptionBasics {
	label: string;
	icon?: IconSource;
}

interface OptionLink extends OptionBasics {
	type: 'link';
	href: string;
}

interface OptionButton extends OptionBasics {
	type: 'button';
	onClick: () => void;
}

export type Option = OptionLink | OptionButton;
