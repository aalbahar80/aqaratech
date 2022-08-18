import { ForbiddenError, subject } from '@casl/ability';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Action } from 'src/casl/casl-ability.factory';
import { generateExpenseCategoryTree } from 'src/constants/default-expense-categories';
import { AuthenticatedUser, IUser } from 'src/interfaces/user.interface';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from 'src/organizations/dto/organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService, private s3: S3Service) {}
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
                connectOrCreate: {
                  where: { email: user.email },
                  create: { email: user.email },
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

    return { organization, roleId: organization.roles[0].id };
  }

  async findOne({ id }: { id: string }) {
    const data = await this.prisma.organization.findUnique({ where: { id } });
    return data;
  }

  async update({
    id,
    updateOrganizationDto,
  }: {
    id: string;
    updateOrganizationDto: UpdateOrganizationDto;
  }) {
    const updated = await this.prisma.organization.update({
      where: { id },
      data: {
        fullName: updateOrganizationDto.fullName,
        label: updateOrganizationDto.label,
      },
    });
    return updated.id;
  }

  async remove({ id, user }: { id: string; user: IUser }) {
    // TODO delete s3 bucket
    // TODO ensure planInvoice stores a `snapshot` of the organization before it is deleted (json field)
    const organization = await this.prisma.organization.findUnique({
      where: { id },
    });
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Delete,
      subject(this.SubjectType, organization),
    );
    const deleted = await this.prisma.organization.delete({ where: { id } });
    return deleted;
  }
}
