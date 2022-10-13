import { ForbiddenError, subject } from '@casl/ability';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
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
	constructor(private readonly prisma: PrismaService, private s3: S3Service) {}
	SubjectType = 'Organization' as const;

	private readonly logger = new Logger(OrganizationsService.name);

	async create({
		createOrganizationDto,
		user,
	}: {
		createOrganizationDto: CreateOrganizationDto;
		user: AuthenticatedUser;
	}) {
		this.logger.debug(
			`${user.email} creating organization ${createOrganizationDto.fullName}`,
		);

		const organization = await this.prisma.organization.create({
			data: {
				fullName: createOrganizationDto.fullName,
				label: createOrganizationDto.label,
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
						expenseCategoryTree:
							generateExpenseCategoryTree() as unknown as Prisma.JsonArray,
					},
				},
			},
			include: { roles: true }, // used to redirect user to switch roles in frontend
		});

		return {
			organization: new OrganizationDto(organization),
			roleId: organization.roles[0].id,
		};
	}

	async findOne({ id, user }: { id: string; user: IUser }) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Read,
			subject(this.SubjectType, { id }),
		);

		const data = await this.prisma.organization.findUniqueOrThrow({
			where: { id },
		});
		return new OrganizationDto(data);
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
				label: updateOrganizationDto.label,
			},
		});
		return updated.id;
	}

	async findAll() {
		const [results, total] = await Promise.all([
			this.prisma.organization.findMany(),
			this.prisma.organization.count(),
		]);

		return { total, results: plainToInstance(OrganizationDto, results) };
	}

	async remove({ id, user }: { id: string; user: IUser }) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Delete,
			subject(this.SubjectType, { id }),
		);

		try {
			await this.s3.deleteBucket(id);
		} catch (error) {
			if (error.name !== 'NoSuchBucket') {
				// Don't throw if the bucket doesn't exist
				throw error;
			}
		}
		this.logger.log(`Deleted bucket ${id}`);

		// TODO ensure planInvoice stores a `snapshot` of the organization before it is deleted (json field)
		const deleted = await this.prisma.organization.delete({ where: { id } });
		this.logger.log(`Deleted organization ${id}`);

		return new OrganizationDto(deleted);
	}
}
