import {
	applyDecorators,
	createParamDecorator,
	ExecutionContext,
} from '@nestjs/common';
import { ApiExtraModels, ApiQuery, getSchemaPath } from '@nestjs/swagger';
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
	(options: QueryOptionsDecoratorConfig, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<Request>();

		// parse with prisma-utils
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { filter, ...parsed } = new RequestParserService().parseQuery(
			request.query,
			options.parserOptions,
		);

		// validate output
		const output = new ZodValidationPipe(queryOptionsParsedSchema).transform(
			parsed,
			{ type: 'query' },
		);

		return output;
	},
);

/**
 * Decorator to add query options to the swagger spec.
 */
export function ApiQueryOptions() {
	return applyDecorators(
		ApiExtraModels(QueryOptionsRequestDto),
		ApiQuery({
			name: 'options',
			required: false,
			schema: {
				$ref: getSchemaPath(QueryOptionsRequestDto),
			},
		}),
	);
}

interface QueryOptionsDecoratorConfig {
	parserOptions?: Partial<RequestQueryOptions>;
	schema?: z.ZodTypeAny;
}
