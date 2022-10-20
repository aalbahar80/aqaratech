/* tslint:disable */
/* eslint-disable */
/**
 * Aqaratech
 * Aqaratech API
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime';
import type {
	CreateOrganizationDto,
	CreateTenantZodDto,
	OrganizationCreatedDto,
	OrganizationDto,
	PaginatedOrganizationDto,
	PaginatedRoleDto,
	SearchDto,
	SortOrderEnum,
	UpdateOrganizationDto,
} from '../models';

export interface OrganizationsApiCreateRequest {
	createOrganizationDto: CreateOrganizationDto;
}

export interface OrganizationsApiCreateTenantRequest {
	organizationId: string;
	createTenantZodDto: CreateTenantZodDto;
}

export interface OrganizationsApiFindOneRequest {
	id: string;
}

export interface OrganizationsApiFindRolesRequest {
	id: string;
	page?: number;
	take?: number;
	sortOrder?: SortOrderEnum;
	filter?: object;
	orderBy?: string;
}

export interface OrganizationsApiRemoveRequest {
	id: string;
}

export interface OrganizationsApiSearchRequest {
	id: string;
	query: string;
}

export interface OrganizationsApiUpdateRequest {
	id: string;
	updateOrganizationDto: UpdateOrganizationDto;
}

/**
 * OrganizationsApi - interface
 *
 * @export
 * @interface OrganizationsApiInterface
 */
export interface OrganizationsApiInterface {
	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof OrganizationsApiInterface
	 */
	createRaw(
		requestParameters: OrganizationsApiCreateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<OrganizationCreatedDto>>;

	/**
	 *
	 *
	 */
	create(
		requestParameters: OrganizationsApiCreateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<OrganizationCreatedDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof OrganizationsApiInterface
	 */
	createTenantRaw(
		requestParameters: OrganizationsApiCreateTenantRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<string>>;

	/**
	 *
	 *
	 */
	createTenant(
		requestParameters: OrganizationsApiCreateTenantRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<string>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof OrganizationsApiInterface
	 */
	findAllRaw(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedOrganizationDto>>;

	/**
	 *
	 *
	 */
	findAll(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedOrganizationDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof OrganizationsApiInterface
	 */
	findOneRaw(
		requestParameters: OrganizationsApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<OrganizationDto>>;

	/**
	 *
	 *
	 */
	findOne(
		requestParameters: OrganizationsApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<OrganizationDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof OrganizationsApiInterface
	 */
	findRolesRaw(
		requestParameters: OrganizationsApiFindRolesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedRoleDto>>;

	/**
	 *
	 *
	 */
	findRoles(
		requestParameters: OrganizationsApiFindRolesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedRoleDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof OrganizationsApiInterface
	 */
	removeRaw(
		requestParameters: OrganizationsApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<OrganizationDto>>;

	/**
	 *
	 *
	 */
	remove(
		requestParameters: OrganizationsApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<OrganizationDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof OrganizationsApiInterface
	 */
	searchRaw(
		requestParameters: OrganizationsApiSearchRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<Array<SearchDto>>>;

	/**
	 *
	 *
	 */
	search(
		requestParameters: OrganizationsApiSearchRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<Array<SearchDto>>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof OrganizationsApiInterface
	 */
	updateRaw(
		requestParameters: OrganizationsApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<string>>;

	/**
	 *
	 *
	 */
	update(
		requestParameters: OrganizationsApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<string>;
}

/**
 *
 */
export class OrganizationsApi
	extends runtime.BaseAPI
	implements OrganizationsApiInterface
{
	/**
	 *
	 *
	 */
	async createRaw(
		requestParameters: OrganizationsApiCreateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<OrganizationCreatedDto>> {
		if (
			requestParameters.createOrganizationDto === null ||
			requestParameters.createOrganizationDto === undefined
		) {
			throw new runtime.RequiredError(
				'createOrganizationDto',
				'Required parameter requestParameters.createOrganizationDto was null or undefined when calling create.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations`,
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.createOrganizationDto,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async create(
		requestParameters: OrganizationsApiCreateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<OrganizationCreatedDto> {
		const response = await this.createRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async createTenantRaw(
		requestParameters: OrganizationsApiCreateTenantRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<string>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling createTenant.',
			);
		}

		if (
			requestParameters.createTenantZodDto === null ||
			requestParameters.createTenantZodDto === undefined
		) {
			throw new runtime.RequiredError(
				'createTenantZodDto',
				'Required parameter requestParameters.createTenantZodDto was null or undefined when calling createTenant.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/tenants`.replace(
					`{${'organizationId'}}`,
					encodeURIComponent(String(requestParameters.organizationId)),
				),
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.createTenantZodDto,
			},
			initOverrides,
		);

		return new runtime.TextApiResponse(response) as any;
	}

	/**
	 *
	 *
	 */
	async createTenant(
		requestParameters: OrganizationsApiCreateTenantRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<string> {
		const response = await this.createTenantRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findAllRaw(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedOrganizationDto>> {
		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/organizations`,
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async findAll(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedOrganizationDto> {
		const response = await this.findAllRaw(initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findOneRaw(
		requestParameters: OrganizationsApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<OrganizationDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findOne.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/organizations/{id}`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async findOne(
		requestParameters: OrganizationsApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<OrganizationDto> {
		const response = await this.findOneRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findRolesRaw(
		requestParameters: OrganizationsApiFindRolesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedRoleDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findRoles.',
			);
		}

		const queryParameters: any = {};

		if (requestParameters.page !== undefined) {
			queryParameters['page'] = requestParameters.page;
		}

		if (requestParameters.take !== undefined) {
			queryParameters['take'] = requestParameters.take;
		}

		if (requestParameters.sortOrder !== undefined) {
			queryParameters['sortOrder'] = requestParameters.sortOrder;
		}

		if (requestParameters.filter !== undefined) {
			queryParameters['filter'] = requestParameters.filter;
		}

		if (requestParameters.orderBy !== undefined) {
			queryParameters['orderBy'] = requestParameters.orderBy;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/organizations/{id}/roles`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async findRoles(
		requestParameters: OrganizationsApiFindRolesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedRoleDto> {
		const response = await this.findRolesRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async removeRaw(
		requestParameters: OrganizationsApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<OrganizationDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling remove.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/organizations/{id}`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'DELETE',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async remove(
		requestParameters: OrganizationsApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<OrganizationDto> {
		const response = await this.removeRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async searchRaw(
		requestParameters: OrganizationsApiSearchRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<Array<SearchDto>>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling search.',
			);
		}

		if (
			requestParameters.query === null ||
			requestParameters.query === undefined
		) {
			throw new runtime.RequiredError(
				'query',
				'Required parameter requestParameters.query was null or undefined when calling search.',
			);
		}

		const queryParameters: any = {};

		if (requestParameters.query !== undefined) {
			queryParameters['query'] = requestParameters.query;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/organizations/{id}/search`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async search(
		requestParameters: OrganizationsApiSearchRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<Array<SearchDto>> {
		const response = await this.searchRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async updateRaw(
		requestParameters: OrganizationsApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<string>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling update.',
			);
		}

		if (
			requestParameters.updateOrganizationDto === null ||
			requestParameters.updateOrganizationDto === undefined
		) {
			throw new runtime.RequiredError(
				'updateOrganizationDto',
				'Required parameter requestParameters.updateOrganizationDto was null or undefined when calling update.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations/{id}`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'PATCH',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.updateOrganizationDto,
			},
			initOverrides,
		);

		return new runtime.TextApiResponse(response) as any;
	}

	/**
	 *
	 *
	 */
	async update(
		requestParameters: OrganizationsApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<string> {
		const response = await this.updateRaw(requestParameters, initOverrides);
		return await response.value();
	}
}
