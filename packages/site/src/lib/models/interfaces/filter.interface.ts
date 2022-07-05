export interface Filter {
	id: string;
	name: string;
	options: FilterOption[];
}

interface FilterOption {
	value: string;
	label: string;
	active: boolean;
	action: () => void;
}
