const timeZone = 'UTC';

export const FORMATS = {
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
		timeZone,
	} satisfies Intl.DateTimeFormatOptions,

	month: {
		month: 'short',
		timeZone,
	} satisfies Intl.DateTimeFormatOptions,

	time: {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		timeZone,
	} satisfies Intl.DateTimeFormatOptions,

	datetime: {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		timeZone,
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
	const { type, value } = options;

	const locale = toBrowserLocale(options.locale);

	switch (type) {
		case 'number':
			return new Intl.NumberFormat(locale).format(value);
		case 'currency':
			return new Intl.NumberFormat(locale, FORMATS.currency).format(value);
		case 'date':
			return new Intl.DateTimeFormat(locale, FORMATS.date).format(
				typeof value === 'string' ? new Date(value) : value,
			);
		case 'month':
			return new Intl.DateTimeFormat(locale, FORMATS.month).format(value);
		case 'time':
			return new Intl.DateTimeFormat(locale, FORMATS.time).format(value);
	}
};

/** Explicitly specify arabic numerals for arabic locale. If we don't
 * explicitly specify arabic numerals in local, chrome will use english numerals
 * for arabic locale. */
export const AR_BROWSER_LOCALE = 'ar-u-nu-arab';

export const toBrowserLocale = (locale: Locale) => {
	if (locale === 'ar') {
		return AR_BROWSER_LOCALE;
	} else {
		return locale;
	}
};
