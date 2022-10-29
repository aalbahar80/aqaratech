import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	Logger,
	PipeTransform,
} from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ZodValidationPipe<S extends z.ZodTypeAny>
	implements PipeTransform<unknown, z.infer<S>>
{
	constructor(private schema: S) {}

	private readonly logger = new Logger(ZodValidationPipe.name);

	transform(value: unknown, metadata: ArgumentMetadata): z.infer<S> {
		// only apply validation to the body
		if (metadata.type !== 'body') {
			return value;
		}

		// TODO fail if extra fields are present
		const parsed = this.schema.safeParse(value);

		if (parsed.success) {
			return parsed.data as unknown;
		}

		this.logger.debug(parsed.error);

		const errors = parsed.error.formErrors;

		throw new BadRequestException(errors);
	}
}
