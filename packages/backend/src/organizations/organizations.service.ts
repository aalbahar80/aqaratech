import { randomUUID } from 'node:crypto';

import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Organization } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import tier from 'tier';

import { generateExpenseCategoryTree, tierid } from '@self/utils';
import { Action } from 'src/casl/action.enum';
import { EnvService } from 'src/env/env.service';
import { AuthenticatedUser, IUser } from 'src/interfaces/user.interface';
import {
	CreateOrganizationDto,
	OrganizationDto,
	UpdateOrganizationDto,
} from 'src/organizations/dto/organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class OrganizationsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly s3: S3Service,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
		private readonly env: EnvService,
	) {}
	SubjectType = 'Organization' as const;

	async create({
		createOrganizationDto,
		user,
	}: {
		createOrganizationDto: CreateOrganizationDto;
		user: AuthenticatedUser;
	}) {
		this.logger.log(
			`${user.email} creating organization ${createOrganizationDto.fullName}`,
			OrganizationsService.name,
		);

		const organization = await this.prisma.c.organization.create({
			data: {
				fullName: createOrganizationDto.fullName,
				label: createOrganizationDto.label ?? null,
				isActive: true,
				roles: {
					create: [
						{
							roleType: 'ORGADMIN',
							isAccepted: true,
							user: {
								connect: {
									email: user.email,
								},
							},
						},
					],
				},
				organizationSettings: {
					create: {
						expenseCategoryTree: generateExpenseCategoryTree(randomUUID),
					},
				},
			},
			include: { roles: true }, // used to redirect user to switch roles in frontend
		});

		if (!organization.roles[0]) {
			throw new Error('Organization created without a role');
		}

		// create bucket for organization
		try {
			await this.s3.createBucket(organization.id);
		} catch (err) {
			if (err instanceof Error) {
				this.logger.error({
					message: `Error creating bucket for organization ${organization.id} ${err.message}`,
					stack: err.stack,
					cause: err.cause,
				});
			} else {
				this.logger.error(err);
			}
		}

		await tier.subscribe(
			tierid(organization.id),
			this.env.e.PUBLIC_TIER_PLAN_ID_1,
			{
				trialDays: 90,
				info: {
					name: organization.fullName,
					email: user.email,
					phone: '',
					description: '',
					metadata: {},
				},
			},
		);

		return {
			organization: {
				id: organization.id,
				fullName: organization.fullName,
				label: organization.label,
				title: organization.title,
				isActive: organization.isActive,
			},
			roleId: organization.roles[0].id,
		};
	}

	async findOne({ id, user }: { id: string; user: IUser }) {
		const organization = await this.prisma.c.organization.findUniqueOrThrow({
			where: { id, AND: accessibleBy(user.ability, Action.Read).Organization },
		});

		return {
			id: organization.id,
			fullName: organization.fullName,
			label: organization.label,
			title: organization.title,
			isActive: organization.isActive,
		};
	}

	async update({
		id,
		updateOrganizationDto,
		user,
	}: {
		id: string;
		updateOrganizationDto: UpdateOrganizationDto;
		user: IUser;
	}): Promise<OrganizationDto> {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Update,
			subject(this.SubjectType, { ...updateOrganizationDto, id }),
		);

		const organization = await this.prisma.c.organization.update({
			where: { id },
			data: {
				fullName: updateOrganizationDto.fullName,
				label: updateOrganizationDto.label ?? null,
			},
		});

		return {
			id: organization.id,
			fullName: organization.fullName,
			label: organization.label,
			title: organization.title,
			isActive: organization.isActive,
		};
	}

	async remove({ id, user }: { id: string; user: IUser }) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Delete,
			subject(this.SubjectType, { id }),
		);

		try {
			await this.s3.deleteBucket(id);
			this.logger.log(`Deleted bucket ${id}`, OrganizationsService.name);
		} catch (error) {
			// disregard nosuchbucket error
			if (error instanceof Error && error.name === 'NoSuchBucket') {
				this.logger.log({
					message: `Bucket not found when deleting organization ${id}`,
					error,
				});
			} else {
				throw error;
			}
		}

		await tier.cancel(tierid(id));
		this.logger.log(
			`Cancelled all subscriptions for organization ${id}`,
			OrganizationsService.name,
		);

		const organization = await this.prisma.c.organization.delete({
			where: { id },
		});

		this.logger.log(`Deleted organization ${id}`, OrganizationsService.name);

		return {
			id: organization.id,
			fullName: organization.fullName,
			label: organization.label,
			title: organization.title,
			isActive: organization.isActive,
		};
	}

	// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
	@Cron(process.env.STRIPE_USAGE_REPORT_CRON || '0 0,12 * * *')
	// params should be optional, when called from cron it doesn't have any
	async reportUsageAll({ id }: { id?: string } = {}) {
		if (this.env.e.STRIPE_PAUSE_USAGE_REPORTS) {
			if (id) {
				// if id is defined, then that means:
				// (a) we are testing usage reporting and
				// (b) this is not a cron job that will hit API limits
				// so we can still report usage for a single organization
			} else {
				this.logger.warn(
					'STRIPE_PAUSE_USAGE_REPORTS is set, skipping usage report',
					OrganizationsService.name,
				);
				return;
			}
		}

		this.logger.log(
			id
				? `Reporting usage for organization ${id}`
				: `Reporting usage for all organizations`,
			OrganizationsService.name,
		);

		const organizations = id
			? await this.prisma.c.organization.findMany({
					where: { id },
					include: { _count: { select: { Unit: true } } },
			  })
			: await this.prisma.c.organization.findMany({
					include: { _count: { select: { Unit: true } } },
			  });

		this.logger.log(
			`Found ${organizations.length} organizations`,
			OrganizationsService.name,
		);

		const promises = organizations.map((organization) => {
			return this.reportUsage(organization);
		});

		const results = await Promise.allSettled(promises);

		this.logger.log(
			{
				message: `Reported usage for all organizations`,
				success: results.filter((x) => x.status === 'fulfilled').length,
				failure: results.filter((x) => x.status === 'rejected').length,
			},
			OrganizationsService.name,
		);
	}

	/** Report usage for a single organization. */
	async reportUsage(organization: Organization & { _count: { Unit: number } }) {
		return await tier.report(
			tierid(organization.id),
			'feature:unit',
			organization._count.Unit,
			{
				clobber: true,
			},
		);
	}

	// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
	@Cron(process.env.STRIPE_USAGE_REPORT_CRON || '0 0,12 * * *')
	async refreshActiveStatus({ id }: { id?: string } = {}) {
		const organizations = id
			? await this.prisma.c.organization.findMany({
					where: { id },
					select: { id: true, isActive: true },
			  })
			: await this.prisma.c.organization.findMany({
					select: { id: true, isActive: true },
			  });

		const promises = organizations.map(async (organization) => {
			const active = await tier.can(tierid(organization.id), 'feature:unit');
			if (active.err) {
				// Don't update the organization's status if we can't check it

				this.logger.error(
					{
						message: `Error checking active status for organization ${organization.id}`,
						error: active.err,
					},
					OrganizationsService.name,
				);

				return organization;
			}

			if (active.ok !== organization.isActive) {
				// If the status has changed, update it in the database

				this.logger.log({
					level: 'info',
					message: `Updating isActive status for organization ${organization.id}`,
					active: active.ok,
				});

				await this.prisma.c.organization.update({
					where: { id: organization.id },
					data: { isActive: active.ok },
				});
			}

			return organization;
		});

		await Promise.all(promises);
	}
}
