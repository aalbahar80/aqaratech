import clsx from 'clsx';

export const buttonCn = ({ disabled }: { disabled?: boolean }) => {
	return clsx(
		'inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm',
		'hover:bg-indigo-700',
		'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',

		// native disabled pseudo-class doesn't work on anc
		// Alt: data-disabled attribute: https://tailwindcss.com/docs/hover-focus-and-other-states#data-attributes
		// Alt: arbitrary variants: https://tailwindcss.com/docs/hover-focus-and-other-states#using-arbitrary-variants
		disabled && 'opacity-50 cursor-not-allowed',
	);
};
