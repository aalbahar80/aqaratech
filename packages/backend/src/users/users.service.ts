import { Injectable } from '@nestjs/common';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto, UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  create(createUserDto: UserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        roles: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: { organization: { select: { id: true, fullName: true } } },
        },
      },
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: { organization: { select: { id: true, fullName: true } } },
        },
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getRoles(id: string) {
    const result = await this.prisma.user.findUnique({
      where: { id },
      select: {
        roles: true,
      },
    });
    return result;
  }
}
