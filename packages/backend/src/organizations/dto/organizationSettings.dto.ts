import { OrganizationSettings, Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { UpdateExpenseCategoryDto } from 'src/organizations/dto/expenseCategory.dto';

export class OrganizationSettingsDto
  extends AbstractDto
  implements OrganizationSettings
{
  expenseCategoryTree: Prisma.JsonValue;
  organizationId: string;
}

export class UpdateOrganizationSettingsDto
  implements Partial<OrganizationSettings>
{
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateExpenseCategoryDto)
  //@ts-ignore: Index signature for type 'string' is missing in type 'ExpenseCategoryDto'.ts(2416)
  expenseCategoryTree: UpdateExpenseCategoryDto;
}
