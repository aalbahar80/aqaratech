import { IntersectionType, PartialType } from '@nestjs/swagger';
import { Organization } from '@prisma/client';
import { IsString, Length } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';

class OrganizationRequiredDto {
  @Length(1, 255)
  fullName: string;
}

class OrganizationOptionalDto {
  @IsString()
  label: string | null;
}

export class OrganizationDto extends IntersectionType(
  AbstractDto,
  IntersectionType(OrganizationRequiredDto, OrganizationOptionalDto),
) {}

export class CreateOrganizationDto
  extends IntersectionType(
    OrganizationRequiredDto,
    PartialType(OrganizationOptionalDto),
  )
  implements Partial<Organization> {}

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}

export class OrganizationCreatedDto {
  organization: OrganizationDto;
  roleId: string;
}
