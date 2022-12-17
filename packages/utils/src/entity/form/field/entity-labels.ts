import { toUTCFormat } from 'src/entity/form/field/to-utc-format';
import type {
	expenseCreateSchema,
	InnerSchema,
	leaseCreateSchema,
	portfolioCreateSchema,
	portfolioUpdateSchema,
	tenantCreateSchema,
	tenantUpdateSchema,
} from 'src/schemas';
import { isDateOnly } from 'src/schemas/utils/date/is-date-only';
import { isDatetime } from 'src/schemas/utils/date/is-date-time';
import { startCase } from 'src/start-case';

import type { Union } from 'ts-toolbelt';

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
} satisfies Partial<Union.Strict<Record<Keys, string>>>;

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
