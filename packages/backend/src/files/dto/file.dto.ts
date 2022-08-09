import { ListObjectsV2Output } from '@aws-sdk/client-s3';
import { IntersectionType, PartialType } from '@nestjs/swagger';
import { File } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IsID } from 'src/decorators/field.decorators';

class FileRequiredDto {
  @IsString()
  fileName: string;
}

class FileOptionalDto {
  @IsString()
  label?: string | null;

  // TODO validate only exactly one of these is present
  @IsID()
  @IsOptional()
  // TODO remove question mark?
  portfolioId?: string | null;

  @IsID()
  @IsOptional()
  // TODO remove question mark?
  propertyId?: string | null;

  @IsID()
  @IsOptional()
  // TODO remove question mark?
  unitId?: string | null;

  @IsID()
  @IsOptional()
  // TODO remove question mark?
  expenseId?: string | null;

  @IsID()
  @IsOptional()
  // TODO remove question mark?
  leaseId?: string | null;

  @IsID()
  @IsOptional()
  // TODO remove question mark?
  leaseInvoiceId?: string | null;

  @IsID()
  @IsOptional()
  // TODO remove question mark?
  maintenanceOrderId?: string | null;
}

export class FileDto {
  constructor(obj: NonNullable<ListObjectsV2Output['Contents']>[0]) {
    Object.assign(this, obj);
  }

  @IsString()
  Key: string;

  @IsNumber()
  Size: number;
}

export class CreateFileDto
  extends IntersectionType(FileRequiredDto, PartialType(FileOptionalDto))
  implements Partial<File> {}
