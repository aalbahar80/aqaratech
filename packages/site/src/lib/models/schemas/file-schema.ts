import { isID } from '$lib/models/schemas/id.schema';
import { trim } from '$lib/zodTransformers.js';
import { z } from 'zod';

export const schema = z.object({
	fileName: z.string().min(1, { message: 'Required' }).transform(trim),
	file: z.any(),

	// Do not change. Specifically, this is sent using the multipart/form-data content type,
	// Which causes the api sdk to change null to "null". Therefore, falsey values should NOT be sent.
	tenantId: isID.nullish(),
	portfolioId: isID.nullish(),
	propertyId: isID.nullish(),
	unitId: isID.nullish(),
	expenseId: isID.nullish(),
	leaseId: isID.nullish(),
	leaseInvoiceId: isID.nullish(),
	maintenanceOrderId: isID.nullish(),
});
