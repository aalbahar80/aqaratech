import { applyDecorators } from '@nestjs/common';
import { IsUUID } from 'class-validator';

/** uuid validator */
export function IsID(): PropertyDecorator {
	return applyDecorators(IsUUID());
}
