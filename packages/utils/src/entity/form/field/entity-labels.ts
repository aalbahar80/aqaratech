import type { Union } from 'ts-toolbelt';
import type {
	portfolioCreateSchema,
	portfolioUpdateSchema,
	tenantCreateSchema,
	tenantUpdateSchema,
	InnerSchema,
	leaseCreateSchema,
	expenseCreateSchema,
} from '../../../schemas';
import { isDateOnly } from '../../../schemas/utils/date/is-date-only';
import { isDatetime } from '../../../schemas/utils/date/is-date-time';
import { startCase } from '../../../start-case';
import { toUTCFormat } from './to-utc-format';

export const entityFieldLabels = {
	fullName: 'Full Name',
	dob: 'Date of Birth',
	civilid: 'Civil ID',

	passportNum: 'Passport Number',
	residencyNum: 'Residency Number',
	residencyEnd: 'Residency Expiration',

	notify: 'Send payment reminders',
	canPay: 'Allow tenant to pay invoices online',
	tenantId: 'Tenant',

	categoryId: 'Category',

	key: 'Name',
} satisfies Partial<Union.Strict<Record<Keys, string>>> & {
	key: string; // FileDto
};

type Schemas =
	| typeof portfolioCreateSchema
	| typeof portfolioUpdateSchema
	| typeof tenantCreateSchema
	| typeof tenantUpdateSchema
	| InnerSchema<typeof leaseCreateSchema>
	| typeof expenseCreateSchema;

type Keys = keyof Union.IntersectOf<Schemas['shape']>;

export const getLabel = (key: string) =>
	(entityFieldLabels as Record<string, string>)[key] ?? startCase(key);

/**
 * Displayed when a value is null or undefined.
 */
export const EMPTY_VALUE = '-';

/**
 * Convenience function to format a field's value.
 */
export const formatValue = (value: unknown): string => {
	if (typeof value === 'string' && (isDatetime(value) || isDateOnly(value))) {
		return toUTCFormat(value);
	} else if (typeof value === 'string') {
		return value;
	} else if (typeof value === 'number') {
		return value.toLocaleString();
	} else if (value === null || value === undefined) {
		return EMPTY_VALUE;
	} else {
		return JSON.stringify(value);
	}
};
