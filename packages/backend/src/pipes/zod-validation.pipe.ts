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
	constructor(private readonly schema: S) {}

	private readonly logger = new Logger(ZodValidationPipe.name);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	transform(value: unknown, _metadata: ArgumentMetadata): z.infer<S> {
		const parsed = this.schema.safeParse(value);

		if (parsed.success) {
			return parsed.data as unknown;
		}

		this.logger.debug(parsed.error);

		const errors = parsed.error.formErrors;

		throw new BadRequestException(errors);
	}
}
