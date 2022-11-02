import {
	applyDecorators,
	createParamDecorator,
	ExecutionContext,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import {
	RequestParserService,
	RequestQueryOptions,
} from '@prisma-utils/nestjs-request-parser';
import { queryOptionsParsedSchema } from '@self/utils';
import { Request } from 'express';
import { QueryOptionsRequestDto } from 'src/common/dto/query-options.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { z } from 'zod';

export const QueryParser = createParamDecorator(
	(options: QueryOptionsDecoratorConfig | undefined, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<Request>();

		// Parse with prisma-utils
		const parsed = new RequestParserService().parseQuery(request.query, {
			limitParamName: 'take',
			...options?.parserOptions,
		});

		// Validate output with zod

		// Allow to filter by specific fields only
		const keys = options?.filterOptions?.keys;
		const filterKeySchema = keys ? z.enum(keys) : z.never();

		const schema = queryOptionsParsedSchema.extend({
			filter: z.record(filterKeySchema, z.any()),
		});

		const output = new ZodValidationPipe(schema).transform(parsed, {
			type: 'custom',
		});

		return output;
	},
);

/**
 * Decorator to add query options to the swagger spec.
 */
export function ApiQueryOptions() {
	return applyDecorators(
		// https://swagger.io/docs/specification/describing-parameters/#common
		// ApiExtraModels(QueryOptionsRequestDto),
		ApiQuery({ type: QueryOptionsRequestDto }),
	);
}

interface QueryOptionsDecoratorConfig {
	parserOptions?: Partial<RequestQueryOptions>;
	filterOptions?: {
		keys?: [string, ...string[]];
	};
}
