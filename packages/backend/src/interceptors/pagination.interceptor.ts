import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
	private readonly logger = new Logger(PaginationInterceptor.name);

	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<PaginatedMetaDto<T>> {
		const request = context.switchToHttp().getRequest<Request>();
		const query = request.query;

		return next.handle().pipe(
			map((data: WithCount<T>) => {
				if (data.total === undefined) {
					this.logger.error(
						'No `total` found in response. Attempted to paginate a response that did not have a `total` property.',
					);
				}
				const itemCount = data.total;
				const pageSize = data.results.length;
				const pagination = new PaginatedDto({
					itemCount,
					pageSize,
					page: queryToInt(query[PAGE_PARAM]) ?? PAGE_PARAM_DEFAULT,
					take: queryToInt(query[TAKE_PARAM]) ?? TAKE_PARAM_DEFAULT,
				});

				return { pagination, results: data.results };
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
