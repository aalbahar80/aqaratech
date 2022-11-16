export const startCase = (str: string): string =>
	str
		.split(/[\s_-]|(?=[A-Z])/)
		.map((word) =>
			typeof word[0] === 'string'
				? word[0].toUpperCase() + word.slice(1).toLowerCase()
				: '',
		)
		.join(' ');
