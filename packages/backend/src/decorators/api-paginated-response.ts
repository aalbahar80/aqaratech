import { applyDecorators, Type, UseInterceptors } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { PaginationInterceptor } from 'src/interceptors/pagination.interceptor';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
	model: TModel,
) => {
	return applyDecorators(
		UseInterceptors(PaginationInterceptor),
		ApiExtraModels(model), // needed?
		ApiOkResponse({
			schema: {
				title: `Paginated${model.name}`,
				required: ['results'],
				allOf: [
					// https://docs.nestjs.com/openapi/operations#advanced-generic-apiresponse
					{ $ref: getSchemaPath(PaginatedMetaDto) },
					{
						title: `ArrayOf${model.name}`,
						properties: {
							results: {
								type: 'array',
								items: { $ref: getSchemaPath(model) },
							},
						},
					},
				],
			},
		}),
	);
};
