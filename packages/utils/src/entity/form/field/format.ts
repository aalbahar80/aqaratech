const formats = {
	currency: {
		style: 'currency',
		currency: 'KWD',
		compactDisplay: 'short',
		maximumFractionDigits: 0, // Don't show cents
		// notation: 'compact',
	} satisfies Intl.NumberFormatOptions,

	date: {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	} satisfies Intl.DateTimeFormatOptions,

	month: { month: 'short' } satisfies Intl.DateTimeFormatOptions,

	time: {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	} satisfies Intl.DateTimeFormatOptions,
};

type Locale = 'en' | 'ar';

type FormatTypeOptions =
	| {
			type: 'number' | 'currency';
			value: number;
	  }
	| {
			type: 'month' | 'time';
			value: Date;
	  }
	| {
			type: 'date';
			value: Date | string;
	  };

type FormatOptions = FormatTypeOptions & { locale: Locale };

export const fmt = (options: FormatOptions) => {
	const { locale, type, value } = options;

	switch (type) {
		case 'number':
			return new Intl.NumberFormat(locale).format(value);
		case 'currency':
			return new Intl.NumberFormat(locale, formats.currency).format(value);
		case 'date':
			return new Intl.DateTimeFormat(locale, formats.date).format(
				typeof value === 'string' ? new Date(value) : value,
			);
		case 'month':
			return new Intl.DateTimeFormat(locale, formats.month).format(value);
		case 'time':
			return new Intl.DateTimeFormat(locale, formats.time).format(value);
	}
};
