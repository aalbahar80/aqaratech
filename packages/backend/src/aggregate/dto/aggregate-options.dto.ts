import { ApiPropertyOptional } from '@nestjs/swagger';
import { aggregateOptionsSchema } from 'src/aggregate/dto/aggregate-options.schema';
import { z } from 'zod';

export class AggregateOptionsDto
	implements z.infer<typeof aggregateOptionsSchema>
{
	@ApiPropertyOptional() // optional because of default value
	start: string;

	@ApiPropertyOptional() // optional because of default value
	end: string;

	propertyId?: string;
	unitId?: string;
}
