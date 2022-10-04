import { Injectable, Logger } from '@nestjs/common';
import { OrganizationDto } from 'src/organizations/dto/organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, ValidatedUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly logger = new Logger(UsersService.name);

	async create({ createUserDto }: { createUserDto: CreateUserDto }) {
		return this.prisma.user.create({ data: createUserDto });
	}

	// findAll() {
	//   return this.prisma.user.findMany({
	//     include: {
	//       roles: true,
	//     },
	//   });
	// }

	// findOne(id: string): Promise<ValidatedUserDto> {
	//   return this.prisma.user.findUniqueOrThrow({
	//     where: { id },
	//     include: {
	//       roles: {
	//         include: { organization: { select: { id: true, fullName: true } } },
	//       },
	//     },
	//   });
	// }

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

	async getRoles(id: string) {
		const result = await this.prisma.user.findUniqueOrThrow({
			where: { id },
			select: {
				roles: true,
			},
		});
		return result;
	}
}
