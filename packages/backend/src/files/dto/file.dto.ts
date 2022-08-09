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
  @IsID()
  @IsOptional()
  // TODO remove question mark?
  portfolioId?: string | null;

  @IsID()
  @IsOptional()
  // TODO remove question mark?
  propertyId?: string | null;
}

export class FileDto extends IntersectionType(
  AbstractDto,
  IntersectionType(FileRequiredDto, FileOptionalDto),
) {}

export class CreateFileDto
  extends IntersectionType(FileRequiredDto, PartialType(FileOptionalDto))
  implements Partial<File> {}
