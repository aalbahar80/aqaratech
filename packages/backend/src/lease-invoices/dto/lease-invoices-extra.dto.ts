import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { DueStatus, LeaseInvoiceV, PaymentTime } from '@prisma/client';

import { Exactly } from 'src/types/exactly.type';

export interface LeaseInvoiceAggregate {
	sum: {
		amount: LeaseInvoiceV['amount'] | null;
	};
	isPaid: LeaseInvoiceV['isPaid'];
	paymentTime: LeaseInvoiceV['paymentTime'];
	dueStatus: LeaseInvoiceV['dueStatus'];
}

export class LeaseInvoiceAggregateSumDto
	implements Exactly<LeaseInvoiceAggregate['sum'], LeaseInvoiceAggregateSumDto>
{
	amount: number | null;
}

export class LeaseInvoiceAggregateDto
	implements Exactly<LeaseInvoiceAggregate, LeaseInvoiceAggregateDto>
{
	sum: LeaseInvoiceAggregateSumDto;
	isPaid: boolean;
	@ApiProperty({ enum: PaymentTime, enumName: 'PaymentTimeEnum' })
	paymentTime: LeaseInvoiceAggregate['paymentTime'];
	@ApiProperty({ enum: DueStatus, enumName: 'DueStatusEnum' })
	dueStatus: LeaseInvoiceAggregate['dueStatus'];
}

// DTO

/** Extra properties returned with leaseInvoices.findAll */
export const LeaseInvoiceExtra = {
	required: ['sum', 'aggregate'],
	properties: {
		sum: { type: 'number', nullable: true },
		aggregate: {
			type: 'array',
			items: { $ref: getSchemaPath(LeaseInvoiceAggregateDto) },
		},
	},
};
