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

export const QueryParser = createParamDecorator(
	(options: Partial<RequestQueryOptions>, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<Request>();

		// parse with prisma-utils
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { filter, ...parsed } = new RequestParserService().parseQuery(
			request.query,
			options,
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
	return applyDecorators(ApiQuery({ type: QueryOptionsRequestDto }));
}
