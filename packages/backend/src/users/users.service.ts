import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Cache } from 'cache-manager';
import { TAppAbility } from 'src/casl/abilities/ability-types';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { OrganizationDto } from 'src/organizations/dto/organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, ValidatedUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class UsersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly caslAbilityFactory: CaslAbilityFactory,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	private readonly logger = new Logger(UsersService.name);

	async create({ createUserDto }: { createUserDto: CreateUserDto }) {
		return this.prisma.user.create({ data: createUserDto });
	}

	async findOneByEmail(email: string): Promise<ValidatedUserDto> {
		let user = await this.prisma.user.findUnique({
			where: { email },
			include: {
				roles: {
					include: {
						organization: { select: { id: true, fullName: true, label: true } },
					},
				},
			},
		});

		if (!user) {
			// If user does not exist, create it. New users who have just signed up
			// will only in exist in Auth0, not in our database.
			this.logger.log(
				`User with email: ${email} does not yet exist in our db. Creating...`,
			);

			user = await this.prisma.user.create({
				data: {
					email,
				},
				include: {
					roles: {
						include: {
							organization: {
								select: { id: true, fullName: true, label: true },
							},
						},
					},
				},
			});
		}

		return {
			...user,
			roles: user.roles.map((role) => ({
				...role,
				organization: new OrganizationDto(role.organization),
			})),
		};
	}

	async getAbility(email: string, role: Omit<Role, 'permissions'>) {
		const cacheKey = `${email}:${role.id}:ability`;

		const cached = await this.cacheManager.get<TAppAbility>(cacheKey);

		if (cached) {
			return cached;
		} else {
			// define fresh ability
			const ability = this.caslAbilityFactory.defineAbility({
				email,
				roleId: role.id,
			});

			// cache it
			await this.cacheManager.set(cacheKey, ability, {
				ttl: 60 * 60,
			});

			return ability;
		}
	}
}
