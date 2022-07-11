import { IntersectionType, PartialType } from '@nestjs/swagger';
import { Organization } from '@prisma/client';
import { IsString, Length } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';

class OrgRequiredDto {
  @Length(1, 255)
  fullName: string;
}

class OrgOptionalDto {
  @IsString()
  shortName: string | null = null;
}

export class OrgDto extends IntersectionType(
  AbstractDto,
  IntersectionType(OrgRequiredDto, OrgOptionalDto),
) {}

export class CreateOrgDto
  extends IntersectionType(OrgRequiredDto, PartialType(OrgOptionalDto))
  implements Partial<Organization> {}

export class UpdateOrgDto extends PartialType(CreateOrgDto) {}
