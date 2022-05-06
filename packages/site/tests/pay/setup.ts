import { randomUUID } from 'crypto';
import {
	fakeClient,
	fakeLease,
	fakeProperty,
	fakeTransactionBasic,
	fakeUnit,
	testTenantId,
} from '../../../seed/generators.js';
import prisma from '../config/prismaClient.js';

export const setupLease = async (tenantId: string) => {
	const { clientId: _c, ...property } = fakeProperty();
	const { propertyId: _p, ...unit } = fakeUnit();
	const {
		tenantId: _,
		unitId: __,
		...lease
	} = fakeLease(testTenantId, randomUUID(), new Date());
	await prisma.client.create({
		data: {
			...fakeClient(),
			properties: {
				connectOrCreate: [
					{
						where: {
							id: property.id,
						},
						create: {
							...property,
							units: {
								connectOrCreate: [
									{
										where: {
											id: unit.id,
										},
										create: {
											...unit,
											leases: {
												connectOrCreate: [
													{
														where: {
															id: lease.id,
														},
														create: {
															...lease,
															tenant: {
																connect: {
																	id: tenantId,
																},
															},
														},
													},
												],
											},
										},
									},
								],
							},
						},
					},
				],
			},
		},
		include: {
			properties: {
				include: {
					units: true,
				},
			},
		},
	});
	return lease.id;
};

export const setupTrx = async (leaseId: string) => {
	const trx = await prisma.transaction.create({
		data: {
			...fakeTransactionBasic(),
			lease: {
				connect: {
					id: leaseId,
				},
			},
		},
	});
	return trx.id;
};
