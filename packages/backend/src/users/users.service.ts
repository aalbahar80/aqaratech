import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, ValidatedUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create({ createUserDto }: { createUserDto: CreateUserDto }) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        roles: true,
      },
    });
  }

  findOne(id: string): Promise<ValidatedUserDto> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: { organization: { select: { id: true, fullName: true } } },
        },
      },
    });
  }

  async findOneByEmail(email: string): Promise<ValidatedUserDto> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: { organization: { select: { id: true, fullName: true } } },
        },
      },
    });
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
