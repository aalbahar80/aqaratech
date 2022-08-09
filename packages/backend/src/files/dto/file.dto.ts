import { IntersectionType, PartialType } from '@nestjs/swagger';
import { File } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { IsID } from 'src/decorators/field.decorators';

class FileRequiredDto {
  @IsString()
  fileName: string;

  @IsString()
  label: string;
}

class FileOptionalDto {
  // TODO validate only one of these is present
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

export class FileDto extends IntersectionType(
  AbstractDto,
  IntersectionType(FileRequiredDto, FileOptionalDto),
) {}

export class CreateFileDto
  extends IntersectionType(FileRequiredDto, PartialType(FileOptionalDto))
  implements Partial<File> {}
