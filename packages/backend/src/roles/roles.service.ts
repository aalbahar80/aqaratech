import { accessibleBy } from '@casl/prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';

import { Action } from 'src/casl/action.enum';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { EnvService } from 'src/env/env.service';
import { RoleCreatedPayload } from 'src/events/role-created.event';
import { IUser } from 'src/interfaces/user.interface';
import { PostmarkService } from 'src/postmark/postmark.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto, RoleDto } from 'src/roles/dto/role.dto';

@Injectable()
export class RolesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly postmarkService: PostmarkService,
		private readonly env: EnvService,
	) {}

	async create({
		createRoleDto,
		roleType,
		organizationId,
		portfolioId,
		tenantId,
		user,
	}: {
		createRoleDto: CreateRoleDto;
		roleType: Role['roleType'];
		organizationId: string;
		portfolioId: string | null;
		tenantId: string | null;
		user: IUser;
	}) {
		const existingRole = await this.prisma.c.role.findFirst({
			where: {
				user: { email: createRoleDto.email },
				roleType,
				organizationId: organizationId,
				portfolioId: portfolioId,
				tenantId: tenantId,
			},
		});

		if (existingRole) {
			throw new BadRequestException('Role already exists for this user');
		}

		const role = await this.prisma.c.role.create({
			data: {
				roleType,
				organization: { connect: { id: organizationId } },

				// Conditionally connect portfolio
				...(portfolioId
					? {
							portfolio: {
								connect: {
									id: portfolioId,
									AND: [{ organizationId: organizationId }], // ensure portfolio belongs to organization
								},
							},
					  }
					: {}),

				// Conditionally connect tenant
				...(tenantId
					? {
							tenant: {
								connect: {
									id: tenantId,
									AND: [{ organizationId: organizationId }], // ensure tenant belongs to organization
								},
							},
					  }
					: {}),

				user: {
					connectOrCreate: {
						where: { email: createRoleDto.email },
						create: { email: createRoleDto.email },
					},
				},
			},
		});

		await this.sendWelcomeEmail({ roleId: role.id, senderEmail: user.email });

		return {
			id: role.id,
			createdAt: role.createdAt,
			email: createRoleDto.email,
			roleType: role.roleType,
			organizationId: role.organizationId,
			portfolioId: role.portfolioId,
			tenantId: role.tenantId,
		};
	}

	async sendWelcomeEmail(payload: RoleCreatedPayload) {
		const origin = this.env.e.PUBLIC_SITE_URL;

		const role = await this.prisma.c.role.findUniqueOrThrow({
			where: { id: payload.roleId },
			include: {
				user: { select: { email: true } },
				organization: { select: { fullName: true } },
				portfolio: { select: { organization: { select: { fullName: true } } } },
				tenant: { select: { organization: { select: { fullName: true } } } },
			},
		});

		const msg = await this.postmarkService.sendEmail({
			From: 'Aqaratech <notifications@aqaratech.com>',
			To: role.user.email,
			TemplateAlias: 'user-invitation',
			TemplateModel: {
				invite_sender_email: payload.senderEmail,
				invite_sender_organization_name: role.organization.fullName,
				// TODO replace with url to either (if user !exists) signup page with email prefilled, or (if user exists) portfolio/tenant portal page
				action_url: origin,
			},
		});

		// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
		return msg.To as typeof role.user.email;
	}

	async findAll({
		queryOptions,
		user,
		where,
	}: {
		queryOptions: QueryOptionsDto;
		user: IUser;
		where?: Prisma.RoleWhereInput;
	}): Promise<WithCount<RoleDto>> {
		const { skip, take, sort } = queryOptions;

		const filter = {
			AND: [
				accessibleBy(user.ability, Action.Read).Role,
				...(where ? [where] : []),
				queryOptions.filter,
			],
		} satisfies Prisma.RoleWhereInput;

		const [data, total] = await Promise.all([
			this.prisma.c.role.findMany({
				take,
				skip,
				orderBy: sort,
				where: filter,
				select: {
					id: true,
					organizationId: true,
					portfolioId: true,
					tenantId: true,
					createdAt: true,
					roleType: true,
					user: { select: { email: true } },
				},
			}),
			this.prisma.c.role.count({ where: filter }),
		]);

		const results = data.map((r) => {
			const { user, ...role } = r;
			return { ...role, email: user.email };
		}) satisfies RoleDto[];

		return { total, results };
	}

	async remove({ id, user }: { id: string; user: IUser }) {
		const role = await this.prisma.c.role.findUniqueOrThrow({
			where: {
				id,
				AND: [accessibleBy(user.ability, Action.Delete).Role],
			},
		});

		// Ensure that the organization has at least one admin role
		if (role.roleType === 'ORGADMIN') {
			const org = await this.prisma.c.organization.findUniqueOrThrow({
				where: {
					id: user.role.organizationId,
					AND: [accessibleBy(user.ability, Action.Read).Organization],
				},
				select: { roles: { where: { roleType: 'ORGADMIN' } } },
			});

			if (org.roles.length <= 1) {
				throw new BadRequestException(
					'Deletion unsuccessful. Please ensure that the organization has at least one admin role before attempting to delete.',
				);
			}
		}

		const deleted = await this.prisma.c.role.delete({
			where: {
				id,
				AND: [accessibleBy(user.ability, Action.Delete).Role],
			},
		});

		return deleted.id;
	}
}
