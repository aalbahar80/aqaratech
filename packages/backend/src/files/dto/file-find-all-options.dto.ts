import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsID } from 'src/decorators/field.decorators';
import { FileForeignKeys } from 'src/files/dto/file-foreign-keys';

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

  @ApiProperty()
  @Expose()
  get relation(): [FileForeignKeys, string] {
    // get relation(): FileForeignKeys {
    const firstTruthy = Object.entries(this).find(
      ([, value]) => value && typeof value === 'string',
    );
    const relationKey = firstTruthy?.[0];
    const relationValue = firstTruthy?.[1];

    if (!relationKey || !relationValue || typeof relationValue !== 'string') {
      throw new Error('Insufficient FileFindAllOptionsDto fields');
    }

    return [relationKey as FileForeignKeys, relationValue];
    // return relationKey as FileForeignKeys;
  }
}
