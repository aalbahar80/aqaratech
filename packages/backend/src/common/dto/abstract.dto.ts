import { ApiProperty } from '@nestjs/swagger';

import { DateType } from 'src/decorators/date-type.decorator';

export class AbstractDto {
	@ApiProperty({ readOnly: true })
	id: string;

	@DateType(false, true)
	createdAt: Date;

	@DateType(false, true)
	updatedAt: Date;
}
