import { ApiProperty } from '@nestjs/swagger';

export class AbstractDto {
	@ApiProperty({ readOnly: true })
	id: string;

	createdAt: Date;

	updatedAt: Date;
}
