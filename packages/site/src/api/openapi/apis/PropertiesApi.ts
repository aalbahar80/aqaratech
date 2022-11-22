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
	PaginatedPropertyDto,
	PaginatedUnitDto,
	PropertyDto,
	UpdatePropertyDto,
} from '../models';

export interface PropertiesApiFindAllRequest {
	page?: number | undefined;
	skip?: number | undefined;
	take?: number | undefined;
	sort?: Array<string> | undefined;
	filter?: object | undefined;
}

export interface PropertiesApiFindOneRequest {
	id: string;
}

export interface PropertiesApiFindUnitsRequest {
	id: string;
	page?: number | undefined;
	skip?: number | undefined;
	take?: number | undefined;
	sort?: Array<string> | undefined;
	filter?: object | undefined;
}

export interface PropertiesApiRemoveRequest {
	id: string;
}

export interface PropertiesApiUpdateRequest {
	id: string;
	updatePropertyDto: UpdatePropertyDto;
}

/**
 *
 */
export class PropertiesApi extends runtime.BaseAPI {
	/**
	 *
	 *
	 */
	async findAllRaw(
		requestParameters: PropertiesApiFindAllRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedPropertyDto>> {
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

		if (requestParameters.filter !== undefined) {
			queryParameters['filter'] = requestParameters.filter;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/properties`,
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
		requestParameters: PropertiesApiFindAllRequest = {},
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedPropertyDto> {
		const response = await this.findAllRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findOneRaw(
		requestParameters: PropertiesApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PropertyDto>> {
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
				path: `/properties/{id}`.replace(
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
		requestParameters: PropertiesApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PropertyDto> {
		const response = await this.findOneRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findUnitsRaw(
		requestParameters: PropertiesApiFindUnitsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedUnitDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findUnits.',
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

		if (requestParameters.filter !== undefined) {
			queryParameters['filter'] = requestParameters.filter;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/properties/{id}/units`.replace(
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
	async findUnits(
		requestParameters: PropertiesApiFindUnitsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedUnitDto> {
		const response = await this.findUnitsRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async removeRaw(
		requestParameters: PropertiesApiRemoveRequest,
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
				path: `/properties/{id}`.replace(
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
		requestParameters: PropertiesApiRemoveRequest,
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
		requestParameters: PropertiesApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PropertyDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling update.',
			);
		}

		if (
			requestParameters.updatePropertyDto === null ||
			requestParameters.updatePropertyDto === undefined
		) {
			throw new runtime.RequiredError(
				'updatePropertyDto',
				'Required parameter requestParameters.updatePropertyDto was null or undefined when calling update.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/properties/{id}`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'PATCH',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.updatePropertyDto,
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
		requestParameters: PropertiesApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PropertyDto> {
		const response = await this.updateRaw(requestParameters, initOverrides);
		return await response.value();
	}
}
