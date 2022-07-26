import { OrganizationSettings, Prisma } from '@prisma/client';
import { IsArray } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { ExpenseCategoryDto } from 'src/organizations/dto/expenseCategory.dto';

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
  //@ts-ignore: Index signature for type 'string' is missing in type 'ExpenseCategoryDto'.ts(2416)
  expenseCategoryTree: ExpenseCategoryDto[];
}
