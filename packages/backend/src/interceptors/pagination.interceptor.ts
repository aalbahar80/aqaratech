import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { z } from 'zod';

import {
	PaginatedDto,
	PaginatedMetaDto,
	WithCount,
} from 'src/common/dto/paginated.dto';
import {
	PAGE_PARAM,
	PAGE_PARAM_DEFAULT,
	TAKE_PARAM,
	TAKE_PARAM_DEFAULT,
} from 'src/constants/pagination.constant';

/**
 * DRY approach to pagination.
 */
@Injectable()
export class PaginationInterceptor<T>
	implements NestInterceptor<T, PaginatedMetaDto<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<PaginatedMetaDto<T>> {
		const request = context.switchToHttp().getRequest<Request>();
		const query = request.query;

		return next.handle().pipe(
			map((rawData: unknown) => {
				const data = withCountSchema.parse(rawData) as WithCount<T>;

				const itemCount = data.total;
				const pageSize = data.results.length;
				const pagination = new PaginatedDto({
					itemCount,
					pageSize,
					page: queryToInt(query[PAGE_PARAM]) ?? PAGE_PARAM_DEFAULT,
					take: queryToInt(query[TAKE_PARAM]) ?? TAKE_PARAM_DEFAULT,
				});

				// Remove total (count) from response,
				// passthrough any unknown properties returned from the query
				const { total, ...rest } = data;
				return {
					...rest,
					pagination,
				};
			}),
		);
	}
}

const queryToInt = (q: unknown) => {
	if (typeof q === 'string') {
		return parseInt(q);
	} else if (typeof q === 'number') {
		return q;
	} else {
		return undefined;
	}
};

// Zod schema to validate withCount
const withCountSchema = z
	.object({
		total: z.number().min(0),
		results: z.array(z.unknown()),
	})
	.passthrough(); // Allow extra properties
