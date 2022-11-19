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
import type { CreateRoleDto, RoleDto } from '../models';

export interface RolesApiCreateOrgAdminRoleRequest {
	organizationId: string;
	createRoleDto: CreateRoleDto;
}

export interface RolesApiCreatePortfolioRoleRequest {
	organizationId: string;
	portfolioId: string;
	createRoleDto: CreateRoleDto;
}

export interface RolesApiCreateTenantRoleRequest {
	organizationId: string;
	tenantId: string;
	createRoleDto: CreateRoleDto;
}

export interface RolesApiRemoveRequest {
	id: string;
	organizationId: string;
}

export interface RolesApiSendInviteRequest {
	roleId: string;
	organizationId: string;
}

/**
 * RolesApi - interface
 *
 * @export
 * @interface RolesApiInterface
 */
export interface RolesApiInterface {
	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof RolesApiInterface
	 */
	createOrgAdminRoleRaw(
		requestParameters: RolesApiCreateOrgAdminRoleRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<RoleDto>>;

	/**
	 *
	 *
	 */
	createOrgAdminRole(
		requestParameters: RolesApiCreateOrgAdminRoleRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<RoleDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof RolesApiInterface
	 */
	createPortfolioRoleRaw(
		requestParameters: RolesApiCreatePortfolioRoleRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<RoleDto>>;

	/**
	 *
	 *
	 */
	createPortfolioRole(
		requestParameters: RolesApiCreatePortfolioRoleRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<RoleDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof RolesApiInterface
	 */
	createTenantRoleRaw(
		requestParameters: RolesApiCreateTenantRoleRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<RoleDto>>;

	/**
	 *
	 *
	 */
	createTenantRole(
		requestParameters: RolesApiCreateTenantRoleRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<RoleDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof RolesApiInterface
	 */
	removeRaw(
		requestParameters: RolesApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<string>>;

	/**
	 *
	 *
	 */
	remove(
		requestParameters: RolesApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<string>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof RolesApiInterface
	 */
	sendInviteRaw(
		requestParameters: RolesApiSendInviteRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<void>>;

	/**
	 *
	 *
	 */
	sendInvite(
		requestParameters: RolesApiSendInviteRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<void>;
}

/**
 *
 */
export class RolesApi extends runtime.BaseAPI implements RolesApiInterface {
	/**
	 *
	 *
	 */
	async createOrgAdminRoleRaw(
		requestParameters: RolesApiCreateOrgAdminRoleRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<RoleDto>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling createOrgAdminRole.',
			);
		}

		if (
			requestParameters.createRoleDto === null ||
			requestParameters.createRoleDto === undefined
		) {
			throw new runtime.RequiredError(
				'createRoleDto',
				'Required parameter requestParameters.createRoleDto was null or undefined when calling createOrgAdminRole.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/roles`.replace(
					`{${'organizationId'}}`,
					encodeURIComponent(String(requestParameters.organizationId)),
				),
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.createRoleDto,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async createOrgAdminRole(
		requestParameters: RolesApiCreateOrgAdminRoleRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<RoleDto> {
		const response = await this.createOrgAdminRoleRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async createPortfolioRoleRaw(
		requestParameters: RolesApiCreatePortfolioRoleRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<RoleDto>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling createPortfolioRole.',
			);
		}

		if (
			requestParameters.portfolioId === null ||
			requestParameters.portfolioId === undefined
		) {
			throw new runtime.RequiredError(
				'portfolioId',
				'Required parameter requestParameters.portfolioId was null or undefined when calling createPortfolioRole.',
			);
		}

		if (
			requestParameters.createRoleDto === null ||
			requestParameters.createRoleDto === undefined
		) {
			throw new runtime.RequiredError(
				'createRoleDto',
				'Required parameter requestParameters.createRoleDto was null or undefined when calling createPortfolioRole.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/portfolios/{portfolioId}/roles`
					.replace(
						`{${'organizationId'}}`,
						encodeURIComponent(String(requestParameters.organizationId)),
					)
					.replace(
						`{${'portfolioId'}}`,
						encodeURIComponent(String(requestParameters.portfolioId)),
					),
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.createRoleDto,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async createPortfolioRole(
		requestParameters: RolesApiCreatePortfolioRoleRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<RoleDto> {
		const response = await this.createPortfolioRoleRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async createTenantRoleRaw(
		requestParameters: RolesApiCreateTenantRoleRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<RoleDto>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling createTenantRole.',
			);
		}

		if (
			requestParameters.tenantId === null ||
			requestParameters.tenantId === undefined
		) {
			throw new runtime.RequiredError(
				'tenantId',
				'Required parameter requestParameters.tenantId was null or undefined when calling createTenantRole.',
			);
		}

		if (
			requestParameters.createRoleDto === null ||
			requestParameters.createRoleDto === undefined
		) {
			throw new runtime.RequiredError(
				'createRoleDto',
				'Required parameter requestParameters.createRoleDto was null or undefined when calling createTenantRole.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/tenants/{tenantId}/roles`
					.replace(
						`{${'organizationId'}}`,
						encodeURIComponent(String(requestParameters.organizationId)),
					)
					.replace(
						`{${'tenantId'}}`,
						encodeURIComponent(String(requestParameters.tenantId)),
					),
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.createRoleDto,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async createTenantRole(
		requestParameters: RolesApiCreateTenantRoleRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<RoleDto> {
		const response = await this.createTenantRoleRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async removeRaw(
		requestParameters: RolesApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<string>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling remove.',
			);
		}

		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling remove.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/roles/{id}`
					.replace(
						`{${'id'}}`,
						encodeURIComponent(String(requestParameters.id)),
					)
					.replace(
						`{${'organizationId'}}`,
						encodeURIComponent(String(requestParameters.organizationId)),
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
		requestParameters: RolesApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<string> {
		const response = await this.removeRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async sendInviteRaw(
		requestParameters: RolesApiSendInviteRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<void>> {
		if (
			requestParameters.roleId === null ||
			requestParameters.roleId === undefined
		) {
			throw new runtime.RequiredError(
				'roleId',
				'Required parameter requestParameters.roleId was null or undefined when calling sendInvite.',
			);
		}

		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling sendInvite.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/roles/{roleId}/send-invite`
					.replace(
						`{${'roleId'}}`,
						encodeURIComponent(String(requestParameters.roleId)),
					)
					.replace(
						`{${'organizationId'}}`,
						encodeURIComponent(String(requestParameters.organizationId)),
					),
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.VoidApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async sendInvite(
		requestParameters: RolesApiSendInviteRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<void> {
		await this.sendInviteRaw(requestParameters, initOverrides);
	}
}
