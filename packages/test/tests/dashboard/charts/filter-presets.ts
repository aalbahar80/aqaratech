interface filterPreset {
	range: string;
	property: string;
	unit: string;
}

interface ChartPresetTest {
	/** An identifiable name for the test */
	name: string;
	filter: filterPreset;
}

const base = {
	range: 'Last 12 Months',
	property: 'All properties',
	unit: 'All units',
} satisfies filterPreset;

export const chartTestPresets = [
	{
		name: 'Base',
		filter: base,
	},
	{
		name: 'Unspecified Property',
		filter: {
			...base,
			property: 'Unspecified Property',
		},
	},
	{
		name: 'Specific Property',
		filter: {
			...base,
			property: 'بيان ق 1 م 44',
		},
	},
	{
		name: 'Specific Unit',
		filter: {
			...base,
			property: 'بيان ق 1 م 44',
			unit: 'apartment 100',
		},
	},
] satisfies ChartPresetTest[];
