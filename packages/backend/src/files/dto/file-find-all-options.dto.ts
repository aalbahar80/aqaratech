import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateFileDto } from 'src/files/dto/file.dto';

export class FileFindAllOptionsDto extends PickType(CreateFileDto, [
	'relationKey',
	'relationValue',
]) {}

export class FileFindOneOptionsDto {
	@IsString()
	key: string;
}
