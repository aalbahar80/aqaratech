import { accessibleBy } from '@casl/prisma';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { Action } from 'src/casl/action.enum';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { RoleCreatedEvent } from 'src/events/role-created.event';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';
import { IUser } from 'src/interfaces/user.interface';
import { PostmarkService } from 'src/postmark/postmark.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto, RoleDto } from 'src/roles/dto/role.dto';

@Injectable()
export class RolesService {
	constructor(
		private readonly prisma: PrismaService,
		private postmarkService: PostmarkService,
		private readonly eventEmitter: EventEmitter2,
		readonly configService: ConfigService<EnvironmentConfig>,
	) {}

	private readonly logger = new Logger(RolesService.name);

	async create({
		createRoleDto,
		user,
	}: {
		createRoleDto: CreateRoleDto;
		user: IUser;
	}) {
		let create: Prisma.RoleCreateNestedManyWithoutUserInput['create'];
		// TODO test verification only one or zero of portfolio or tenant is set
		if (createRoleDto.roleType === 'PORTFOLIO' && createRoleDto.portfolioId) {
			create = {
				roleType: createRoleDto.roleType,
				portfolio: { connect: { id: createRoleDto.portfolioId } },
				organization: { connect: { id: createRoleDto.organizationId } },
			};
		} else if (createRoleDto.roleType === 'TENANT' && createRoleDto.tenantId) {
			create = {
				roleType: createRoleDto.roleType,
				tenant: { connect: { id: createRoleDto.tenantId } },
				organization: { connect: { id: createRoleDto.organizationId } },
			};
		} else if (createRoleDto.roleType === 'ORGADMIN') {
			create = {
				roleType: createRoleDto.roleType,
				organization: { connect: { id: createRoleDto.organizationId } },
			};
		} else {
			throw new BadRequestException('Invalid role type');
		}

		const existingRole = await this.prisma.role.findFirst({
			where: {
				user: { email: createRoleDto.email },
				organizationId: createRoleDto.organizationId,
				portfolioId: createRoleDto.portfolioId,
				tenantId: createRoleDto.tenantId,
			},
		});

		if (existingRole) {
			throw new BadRequestException('Role already exists for this user');
		}

		const role = await this.prisma.role.create({
			data: {
				...create,
				user: {
					connectOrCreate: {
						where: { email: createRoleDto.email },
						create: { email: createRoleDto.email },
					},
				},
			},
		});

		this.eventEmitter.emit(
			'role.created',
			new RoleCreatedEvent(role.id, user.email),
		);

		return role;
	}

	@OnEvent('role.created')
	async sendWelcomeEmail(payload: RoleCreatedEvent) {
		const origin = this.configService.get('siteConfig.PUBLIC_SITE_URL', {
			infer: true,
		});

		if (!origin) {
			this.logger.warn('No site origin configured');
		}

		const role = await this.prisma.role.findUniqueOrThrow({
			where: { id: payload.roleId },
			include: {
				user: { select: { email: true } },
				organization: { select: { fullName: true } },
				portfolio: { select: { organization: { select: { fullName: true } } } },
				tenant: { select: { organization: { select: { fullName: true } } } },
			},
		});

		const organizationName =
			role.organization.fullName ||
			role.portfolio?.organization.fullName ||
			role.tenant?.organization.fullName ||
			'';

		await this.postmarkService.sendEmail({
			From: 'Aqaratech <notifications@aqaratech.com>',
			To: role.user.email,
			TemplateAlias: 'user-invitation',
			TemplateModel: {
				invite_sender_email: payload.senderEmail,
				invite_sender_organization_name: organizationName,
				// TODO replace with url to either (if user !exists) signup page with email prefilled, or (if user exists) portfolio/tenant portal page
				action_url: origin ?? '',
			},
		});
	}

	async findAll({
		pageOptionsDto,
		user,
		where,
	}: {
		pageOptionsDto: PageOptionsDto;
		user: IUser;
		where?: Prisma.RoleWhereInput;
	}): Promise<WithCount<RoleDto>> {
		const { page, take } = pageOptionsDto;

		const filter: Prisma.RoleWhereInput = {
			AND: [
				accessibleBy(user.ability, Action.Read).Role,
				...(where ? [where] : []),
			],
		};

		// TODO fix filter/select
		const [data, total] = await Promise.all([
			this.prisma.role.findMany({
				take,
				skip: (page - 1) * take,
				orderBy: { createdAt: 'desc' },
				where: filter,
				include: { user: { select: { email: true } } },
			}),
			this.prisma.role.count({ where: filter }),
		]);

		const results: RoleDto[] = data.map((r) => {
			const { user, ...role } = r;
			return { ...role, email: user.email };
		});

		return { total, results };
	}

	remove(id: string) {
		return this.prisma.role.delete({ where: { id } }).then(() => id);
	}
}
