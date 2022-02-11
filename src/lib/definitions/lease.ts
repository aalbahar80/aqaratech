import { Field } from '$components/form/Field';
import { z } from 'zod';
import { parseISO } from 'date-fns';
import { Prisma } from '@prisma/client';

export type LeaseData = Prisma.LeaseGetPayload<typeof entityData>;
type LeaseDataWithStrings = Omit<LeaseData, 'startDate' | 'endDate'> & {
	startDate: string | null;
	endDate: string | null;
};
export const entityData = Prisma.validator<Prisma.LeaseArgs>()({
	select: {
		id: true,
		startDate: true,
		endDate: true,
		deposit: true,
		monthlyRent: true,
	},
});

// Manually overriding date fields since prisma client wrongly
// types them as dates
export const defaultForm: WithDateAsString<WithoutId<LeaseData>> = {
	startDate: new Date().toISOString(),
	endDate: new Date(
		new Date().setFullYear(new Date().getFullYear() + 1),
	).toISOString(),
	deposit: 0,
	monthlyRent: 0,
};

type WithoutId<T> = Omit<T, 'id'>;
type WithDateAsString<T> = Omit<T, 'startDate' | 'endDate'> & {
	startDate: string | null;
	endDate: string | null;
};

export const transformer = (data: WithDateAsString<LeaseData>): LeaseData => {
	const startDate = data.startDate ? parseISO(data.startDate) : null;
	const endDate = data.endDate ? parseISO(data.endDate) : null;
	return { ...data, startDate, endDate };
};

export const fieldList = [
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false,
		searchType: 'number',
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'tenant_id',
		title: 'Tenant ID',
		editable: false,
		disabled: true,
		searchType: 'number',
	}),
	new Field({
		fieldName: 'start_date',
		title: 'Start',
		inputType: 'date',
		searchable: false,
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'end_date',
		title: 'End',
		inputType: 'date',
		searchable: false,
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'is_expired',
		title: 'Expired?',
		editable: false,
		searchable: false,
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'is_signed',
		title: 'Signed?',
		editable: false,
		searchable: false,
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'monthly_rent',
		title: 'Rent (KD)',
		inputType: 'number',
		searchType: 'number',
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'deposit',
		title: 'Deposit (KD)',
		inputType: 'number',
		searchType: 'number',
	}),
	new Field({
		fieldName: 'license',
		title: 'License',
		searchType: 'text',
	}),
	new Field({
		fieldName: 'unit_id',
		title: 'Unit ID',
		editable: false,
		disabled: true,
		searchType: 'number',
	}),
];

export const formSchema = z
	.object({
		// validate that start_date is an iso string
		startDate: z.string().refine((val) => Date.parse(val), {
			message: 'Start date must be an ISO string',
		}),

		endDate: z.string().refine((val) => Date.parse(val), {
			message: 'End date must be an ISO string',
		}),

		monthlyRent: z.number().nonnegative(),
		deposit: z.number().nonnegative().optional(),
		// license: z.string().optional(),
		// unitId: z.string().min(1, { message: 'Required' }),
		// tenantId: z.string().min(1, { message: 'Required' }),
		// clientId: z.string().min(1, { message: 'Required' }),
		// propertyId: z.string().min(1, { message: 'Required' }),
	})
	.refine((val) => parseISO(val.startDate) < parseISO(val.endDate), {
		path: ['startDate'],
		message: 'Start date must be before end date',
	})
	.refine((val) => parseISO(val.startDate) < parseISO(val.endDate), {
		path: ['endDate'],
		message: 'End date must be after start date',
	});
// export const validation = z.object({
// unit_id: z.string().min(1, { message: 'Required' }),
// tenant_id: z.string().min(1, { message: 'Required' }),
// client_id: z.string().min(1, { message: 'Required' }),
// property_id: z.string().min(1, { message: 'Required' }),
// });

export default { formSchema, defaultForm, transformer };
