import { IsOptional } from 'class-validator';
import { IsID } from 'src/decorators/field.decorators';

export class FileFindAllOptionsDto {
  // TODO validate exactly one is set
  @IsID()
  @IsOptional()
  tenantId?: string;

  @IsID()
  @IsOptional()
  portfolioId?: string;

  @IsID()
  @IsOptional()
  propertyId?: string;

  @IsID()
  @IsOptional()
  unitId?: string;

  @IsID()
  @IsOptional()
  expenseId?: string;

  @IsID()
  @IsOptional()
  leaseId?: string;

  @IsID()
  @IsOptional()
  leaseInvoiceId?: string;

  @IsID()
  @IsOptional()
  maintenanceOrderId?: string;
}
