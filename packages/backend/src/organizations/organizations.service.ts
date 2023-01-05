import { randomUUID } from 'node:crypto';

import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { generateExpenseCategoryTree } from '@self/utils';

import { Action } from 'src/casl/action.enum';
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
		// TODO: emit event to create bucket
		await this.s3.createBucket(organization.id);

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

		await this.s3.deleteBucket(id);

		this.logger.log(`Deleted bucket ${id}`, OrganizationsService.name);

		const deleted = await this.prisma.organization.delete({ where: { id } });
		this.logger.log(`Deleted organization ${id}`, OrganizationsService.name);

		return plainToInstance(OrganizationDto, deleted, {
			excludeExtraneousValues: true,
		});
	}
}
