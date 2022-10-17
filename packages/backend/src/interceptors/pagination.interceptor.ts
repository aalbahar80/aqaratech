import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import {
	PaginatedDto,
	PaginatedMetaDto,
	WithCount,
} from 'src/common/dto/paginated.dto';

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
		const query = request.query as unknown as PageOptionsDto;
		const pageOptionsDto = plainToInstance(PageOptionsDto, query);

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
					pageOptionsDto,
					pageSize,
				});

				return { pagination, results: data.results };
			}),
		);
	}
}
