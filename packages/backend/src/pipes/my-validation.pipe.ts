import { ArgumentMetadata, Injectable, ValidationPipe } from '@nestjs/common';

// Reference: https://github.com/nestjs/nest/issues/2390#issuecomment-517623971
// More about DI in global pipes: https://docs.nestjs.com/guards#binding-guards
/**
 * ValidationPipe is global. For some routes, we want to use ZodValidationPipe instead.
 * This is a workaround to make the global ValidationPipe skip validating the specified DTO's.
 */
@Injectable()
export class MyValidationPipe extends ValidationPipe {
	override async transform(value: unknown, metadata: ArgumentMetadata) {
		let skip = false;

		const name = metadata.metatype?.name;

		if (metadata.type === 'query') {
			console.log('skipping validation for [query]: ', name);
			skip = true;
		}

		if (skip) {
			return value;
		} else {
			console.log('not skipping validation for: ', name, metadata.type);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return await super.transform(value, metadata);
		}
	}
}
