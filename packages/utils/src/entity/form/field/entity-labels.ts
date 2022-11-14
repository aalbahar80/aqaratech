import { toUTCFormat } from 'src/entity/form/field/to-utc-format';
import type {
	portfolioCreateSchema,
	portfolioUpdateSchema,
	tenantCreateSchema,
	tenantUpdateSchema,
} from 'src/schemas';
import { isDatetime } from 'src/schemas/utils/date/is-date-time';
import { startCase } from 'src/start-case';
import type { UnionToIntersection } from 'src/union-to-intersection';

// TODO satisfies Partial<Record<Keys, string>>
export const entityFieldLabels = {
	fullName: 'Full Name',
	dob: 'Date of Birth',
	civilid: 'Civil ID',

	passportNum: 'Passport Number',
	residencyNum: 'Residency Number',
	residencyEnd: 'Residency Expiration',

	notify: 'Send payment reminders',
	canPay: 'Allow tenant to pay invoices online',
};

type Schemas =
	| typeof portfolioCreateSchema
	| typeof portfolioUpdateSchema
	| typeof tenantCreateSchema
	| typeof tenantUpdateSchema;

// @ts-expect-error until satisfies
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Keys = keyof UnionToIntersection<Schemas['shape']>;

export const getLabel = (key: string) =>
	// TODO satisfies remove type-cast, don't add satisfies here
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	(entityFieldLabels as Record<string, string>)[key] ?? startCase(key);

/**
 * Convenience function to format a field's value.
 */
export const formatValue = (value: unknown) => {
	if (typeof value === 'string' && isDatetime(value)) {
		return toUTCFormat(value);
	} else {
		return value ?? '';
	}
};
