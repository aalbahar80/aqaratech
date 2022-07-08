import {
  CallHandler,
  ExecutionContext,
  Injectable,
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

@Injectable()
export class PaginationInterceptor<T>
  implements NestInterceptor<T, PaginatedMetaDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<PaginatedMetaDto<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const query = request.query as unknown as PageOptionsDto;
    const pageOptionsDto = plainToInstance(PageOptionsDto, query);

    return next.handle().pipe(
      map((data: WithCount<T>) => {
        // TODO gracefully handle no `total`
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
