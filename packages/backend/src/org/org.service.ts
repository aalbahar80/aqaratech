import { Injectable } from '@nestjs/common';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { IUser } from 'src/interfaces/user.interface';
import { CreateOrgDto } from 'src/org/dto/org.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrgsService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  create({ createOrgDto }: { createOrgDto: CreateOrgDto; user: IUser }) {
    return this.prisma.organization.create({ data: createOrgDto });
  }

  async findOne({ id }: { id: string }) {
    const data = await this.prisma.organization.findUnique({ where: { id } });
    return data;
  }

  async remove({ id }: { id: string }) {
    return this.prisma.organization.delete({ where: { id } });
  }
}
