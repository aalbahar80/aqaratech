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

		// TODO fail if extra fields are present
		const parsed = this.schema.safeParse(value);

		if (parsed.success) {
			return parsed.data as unknown;
		}

		const errors = parsed.error.formErrors.fieldErrors;

		throw new BadRequestException(errors);
	}
}
