import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
	constructor(private schema: ZodSchema) {}

	transform(value: unknown, metadata: ArgumentMetadata) {
		// only apply validation to the body
		if (metadata.type !== 'body') {
			return value;
		}

		const parsed = this.schema.safeParse(value);

		if (parsed.success) {
			return parsed.data as unknown;
		}

		throw new BadRequestException('Validation failed');
	}
}
