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
	PaginatedLeaseDto,
	PaginatedLeaseInvoiceDto,
	PaginatedRoleDto,
	PaginatedTenantDto,
	SortOrderEnum,
	TenantDto,
	UpdateTenantDto,
} from '../models';

export interface TenantsApiFindAllRequest {
	page?: number;
	take?: number;
	sortOrder?: SortOrderEnum;
	filter?: object;
	orderBy?: string;
}

export interface TenantsApiFindInvoicesRequest {
	id: string;
	page?: number;
	skip?: number;
	take?: number;
	sort?: Array<string>;
}

export interface TenantsApiFindLeasesRequest {
	id: string;
	page?: number;
	take?: number;
	sortOrder?: SortOrderEnum;
	filter?: object;
	orderBy?: string;
}

export interface TenantsApiFindOneRequest {
	id: string;
}

export interface TenantsApiFindRolesRequest {
	id: string;
	page?: number;
	take?: number;
	sortOrder?: SortOrderEnum;
	filter?: object;
	orderBy?: string;
}

export interface TenantsApiRemoveRequest {
	id: string;
}

export interface TenantsApiUpdateRequest {
	id: string;
	updateTenantDto: UpdateTenantDto;
}

/**
 * TenantsApi - interface
 *
 * @export
 * @interface TenantsApiInterface
 */
export interface TenantsApiInterface {
	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof TenantsApiInterface
	 */
	findAllRaw(
		requestParameters: TenantsApiFindAllRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedTenantDto>>;

	/**
	 *
	 *
	 */
	findAll(
		requestParameters: TenantsApiFindAllRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedTenantDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof TenantsApiInterface
	 */
	findInvoicesRaw(
		requestParameters: TenantsApiFindInvoicesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedLeaseInvoiceDto>>;

	/**
	 *
	 *
	 */
	findInvoices(
		requestParameters: TenantsApiFindInvoicesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedLeaseInvoiceDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof TenantsApiInterface
	 */
	findLeasesRaw(
		requestParameters: TenantsApiFindLeasesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedLeaseDto>>;

	/**
	 *
	 *
	 */
	findLeases(
		requestParameters: TenantsApiFindLeasesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedLeaseDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof TenantsApiInterface
	 */
	findOneRaw(
		requestParameters: TenantsApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<TenantDto>>;

	/**
	 *
	 *
	 */
	findOne(
		requestParameters: TenantsApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<TenantDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof TenantsApiInterface
	 */
	findRolesRaw(
		requestParameters: TenantsApiFindRolesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedRoleDto>>;

	/**
	 *
	 *
	 */
	findRoles(
		requestParameters: TenantsApiFindRolesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedRoleDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof TenantsApiInterface
	 */
	removeRaw(
		requestParameters: TenantsApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<string>>;

	/**
	 *
	 *
	 */
	remove(
		requestParameters: TenantsApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<string>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof TenantsApiInterface
	 */
	updateRaw(
		requestParameters: TenantsApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<TenantDto>>;

	/**
	 *
	 *
	 */
	update(
		requestParameters: TenantsApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<TenantDto>;
}

/**
 *
 */
export class TenantsApi extends runtime.BaseAPI implements TenantsApiInterface {
	/**
	 *
	 *
	 */
	async findAllRaw(
		requestParameters: TenantsApiFindAllRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedTenantDto>> {
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
				path: `/tenants`,
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
		requestParameters: TenantsApiFindAllRequest = {},
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedTenantDto> {
		const response = await this.findAllRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findInvoicesRaw(
		requestParameters: TenantsApiFindInvoicesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedLeaseInvoiceDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findInvoices.',
			);
		}

		const queryParameters: any = {};

		if (requestParameters.page !== undefined) {
			queryParameters['page'] = requestParameters.page;
		}

		if (requestParameters.skip !== undefined) {
			queryParameters['skip'] = requestParameters.skip;
		}

		if (requestParameters.take !== undefined) {
			queryParameters['take'] = requestParameters.take;
		}

		if (requestParameters.sort) {
			queryParameters['sort'] = requestParameters.sort;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/tenants/{id}/invoices`.replace(
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
	async findInvoices(
		requestParameters: TenantsApiFindInvoicesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedLeaseInvoiceDto> {
		const response = await this.findInvoicesRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findLeasesRaw(
		requestParameters: TenantsApiFindLeasesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedLeaseDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findLeases.',
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
				path: `/tenants/{id}/leases`.replace(
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
	async findLeases(
		requestParameters: TenantsApiFindLeasesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedLeaseDto> {
		const response = await this.findLeasesRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findOneRaw(
		requestParameters: TenantsApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<TenantDto>> {
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
				path: `/tenants/{id}`.replace(
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
		requestParameters: TenantsApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<TenantDto> {
		const response = await this.findOneRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findRolesRaw(
		requestParameters: TenantsApiFindRolesRequest,
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
				path: `/tenants/{id}/roles`.replace(
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
		requestParameters: TenantsApiFindRolesRequest,
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
		requestParameters: TenantsApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<string>> {
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
				path: `/tenants/{id}`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'DELETE',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.TextApiResponse(response) as any;
	}

	/**
	 *
	 *
	 */
	async remove(
		requestParameters: TenantsApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<string> {
		const response = await this.removeRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async updateRaw(
		requestParameters: TenantsApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<TenantDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling update.',
			);
		}

		if (
			requestParameters.updateTenantDto === null ||
			requestParameters.updateTenantDto === undefined
		) {
			throw new runtime.RequiredError(
				'updateTenantDto',
				'Required parameter requestParameters.updateTenantDto was null or undefined when calling update.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/tenants/{id}`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'PATCH',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.updateTenantDto,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async update(
		requestParameters: TenantsApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<TenantDto> {
		const response = await this.updateRaw(requestParameters, initOverrides);
		return await response.value();
	}
}
