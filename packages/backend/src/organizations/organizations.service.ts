import { NoSuchBucket } from '@aws-sdk/client-s3';
import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { Action } from 'src/casl/action.enum';
import { generateExpenseCategoryTree } from 'src/constants/default-expense-categories';
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
		private s3: S3Service,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
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

		const organization = await this.prisma.organization.create({
			data: {
				fullName: createOrganizationDto.fullName,
				label: createOrganizationDto.label ?? null,
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
						expenseCategoryTree: generateExpenseCategoryTree(),
					},
				},
			},
			include: { roles: true }, // used to redirect user to switch roles in frontend
		});

		if (!organization.roles[0]) {
			throw new Error('Organization created without a role');
		}

		return {
			organization: plainToInstance(OrganizationDto, organization, {
				excludeExtraneousValues: true,
			}),
			roleId: organization.roles[0].id,
		};
	}

	async findOne({ id, user }: { id: string; user: IUser }) {
		const data = await this.prisma.organization.findUniqueOrThrow({
			where: { id, AND: accessibleBy(user.ability, Action.Read).Organization },
		});

		return plainToInstance(OrganizationDto, data, {
			excludeExtraneousValues: true,
		});
	}

	async update({
		id,
		updateOrganizationDto,
		user,
	}: {
		id: string;
		updateOrganizationDto: UpdateOrganizationDto;
		user: IUser;
	}) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Update,
			subject(this.SubjectType, { ...updateOrganizationDto, id }),
		);

		const updated = await this.prisma.organization.update({
			where: { id },
			data: {
				fullName: updateOrganizationDto.fullName,
				label: updateOrganizationDto.label ?? null,
			},
		});

		return plainToInstance(OrganizationDto, updated, {
			excludeExtraneousValues: true,
		});
	}

	async findAll() {
		const [results, total] = await Promise.all([
			this.prisma.organization.findMany(),
			this.prisma.organization.count(),
		]);

		return {
			total,
			results: plainToInstance(OrganizationDto, results, {
				excludeExtraneousValues: true,
			}),
		};
	}

	async remove({ id, user }: { id: string; user: IUser }) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Delete,
			subject(this.SubjectType, { id }),
		);

		try {
			await this.s3.deleteBucket(id);
		} catch (error) {
			if (error instanceof NoSuchBucket) {
				// Don't throw if the bucket doesn't exist
				throw error;
			}
		}
		this.logger.log(`Deleted bucket ${id}`, OrganizationsService.name);

		// TODO ensure planInvoice stores a `snapshot` of the organization before it is deleted (json field)
		const deleted = await this.prisma.organization.delete({ where: { id } });
		this.logger.log(`Deleted organization ${id}`, OrganizationsService.name);

		return plainToInstance(OrganizationDto, deleted, {
			excludeExtraneousValues: true,
		});
	}
}
