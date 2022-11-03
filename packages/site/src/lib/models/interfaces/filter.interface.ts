export interface Filter {
	id: string;
	label: string;
	options: FilterOption[];
}

interface FilterOption {
	value: string;
	label: string;
	active: boolean;
	action: (event: unknown) => void;
}
