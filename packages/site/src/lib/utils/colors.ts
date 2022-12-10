export const palette: Record<string, string[]> = {
	2: ['#003f5c', '#f95d6a'],
	3: ['#003f5c', '#bc5090', '#ffa600'],
	4: ['#003f5c', '#7a5195', '#ef5675', '#ffa600'],
	5: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
	6: ['#003f5c', '#444e86', '#955196', '#dd5182', '#ff6e54', '#ffa600'],
	7: [
		'#003f5c',
		'#374c80',
		'#7a5195',
		'#bc5090',
		'#ef5675',
		'#ff764a',
		'#ffa600',
	],
	8: [
		'#003f5c',
		'#2f4b7c',
		'#665191',
		'#a05195',
		'#d45087',
		'#f95d6a',
		'#ff7c43',
		'#ffa600',
	],
};

export const getColor = (index: number, total: number) => {
	const size = Math.max(2, Math.min(total, 8));
	const backgroundColor = palette[size]?.[index];
	return backgroundColor;
};

export const COLORS = {
	BLUE: '#003f5c',
	RED: '#f95d6a',
	GRAY: '#CFD8DC',
	TEAL: '#00CC99',
};
