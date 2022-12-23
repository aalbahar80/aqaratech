import type { Icon } from '$lib/models/types/icon.type';

export interface IconTooltip {
	label: string | number | null | undefined;
	icon: Icon;
	tooltip: string;
}
