export const colors = {
	// light
	// red: '#93c5fd',
	// blue: '#fca5a5',
	// darkBlue: '#376bd9',

	// dark
	red: '#ef5675',
	blue: '#003f5c',
	darkBlue: '#7a5195',
};

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

export const paletteLight: Record<string, string[]> = {
	2: ['#93c5fd', '#fca5a5'],
	3: ['#93c5fd', '#fca5a5', '#ffdb89'],
	4: ['#93c5fd', '#fca5a5', '#ffdb89', '#fcbf7e'],
	5: ['#93c5fd', '#fca5a5', '#ffdb89', '#fcbf7e', '#f9c7c9'],
	6: ['#93c5fd', '#fca5a5', '#ffdb89', '#fcbf7e', '#f9c7c9', '#a1ddf1'],
	7: [
		'#93c5fd',
		'#fca5a5',
		'#ffdb89',
		'#fcbf7e',
		'#f9c7c9',
		'#a1ddf1',
		'#f0c3b8',
	],
	8: [
		'#93c5fd',
		'#fca5a5',
		'#ffdb89',
		'#fcbf7e',
		'#f9c7c9',
		'#a1ddf1',
		'#f0c3b8',
		'#ffd9b3',
	],
};

export const getColor = (index: number, total: number) => {
	const size = Math.max(2, Math.min(total, 8));
	const backgroundColor = palette[size]?.[index];
	return backgroundColor ?? '#CFD8DC'; // gray fallback
};

export const COLORS = {
	BLUE: '#003f5c',
	RED: '#f95d6a',
	GRAY: '#CFD8DC',
	TEAL: '#00CC99',
};
