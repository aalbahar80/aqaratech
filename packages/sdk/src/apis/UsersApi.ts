/* tslint:disable */
/* eslint-disable */
/**
 * Aqaratech API
 * The Aqratech API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    PaginatedResponseOfUserDto,
    PaginatedResponseOfUserDtoFromJSON,
    PaginatedResponseOfUserDtoToJSON,
    UserDto,
    UserDtoFromJSON,
    UserDtoToJSON,
} from '../models';

export interface CreateUsersRequest {
    userDto: UserDto;
}

export interface FindOneByEmailUsersRequest {
    email: string;
}

export interface FindOneUsersRequest {
    id: string;
}

/**
 * UsersApi - interface
 * 
 * @export
 * @interface UsersApiInterface
 */
export interface UsersApiInterface {
    /**
     * 
     * @param {UserDto} userDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    createUsersRaw(requestParameters: CreateUsersRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UserDto>>;

    /**
     */
    createUsers(requestParameters: CreateUsersRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UserDto>;

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    findAllUsersRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<PaginatedResponseOfUserDto>>;

    /**
     */
    findAllUsers(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<PaginatedResponseOfUserDto>;

    /**
     * 
     * @param {string} email 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    findOneByEmailUsersRaw(requestParameters: FindOneByEmailUsersRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UserDto>>;

    /**
     */
    findOneByEmailUsers(requestParameters: FindOneByEmailUsersRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UserDto>;

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    findOneUsersRaw(requestParameters: FindOneUsersRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UserDto>>;

    /**
     */
    findOneUsers(requestParameters: FindOneUsersRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UserDto>;

}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI implements UsersApiInterface {

    /**
     */
    async createUsersRaw(requestParameters: CreateUsersRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UserDto>> {
        if (requestParameters.userDto === null || requestParameters.userDto === undefined) {
            throw new runtime.RequiredError('userDto','Required parameter requestParameters.userDto was null or undefined when calling createUsers.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth-swagger", []);
        }

        const response = await this.request({
            path: `/users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserDtoToJSON(requestParameters.userDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDtoFromJSON(jsonValue));
    }

    /**
     */
    async createUsers(requestParameters: CreateUsersRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UserDto> {
        const response = await this.createUsersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async findAllUsersRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<PaginatedResponseOfUserDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth-swagger", []);
        }

        const response = await this.request({
            path: `/users`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedResponseOfUserDtoFromJSON(jsonValue));
    }

    /**
     */
    async findAllUsers(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<PaginatedResponseOfUserDto> {
        const response = await this.findAllUsersRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async findOneByEmailUsersRaw(requestParameters: FindOneByEmailUsersRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UserDto>> {
        if (requestParameters.email === null || requestParameters.email === undefined) {
            throw new runtime.RequiredError('email','Required parameter requestParameters.email was null or undefined when calling findOneByEmailUsers.');
        }

        const queryParameters: any = {};

        if (requestParameters.email !== undefined) {
            queryParameters['email'] = requestParameters.email;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth-swagger", []);
        }

        const response = await this.request({
            path: `/users/by-email`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDtoFromJSON(jsonValue));
    }

    /**
     */
    async findOneByEmailUsers(requestParameters: FindOneByEmailUsersRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UserDto> {
        const response = await this.findOneByEmailUsersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async findOneUsersRaw(requestParameters: FindOneUsersRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UserDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling findOneUsers.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth-swagger", []);
        }

        const response = await this.request({
            path: `/users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDtoFromJSON(jsonValue));
    }

    /**
     */
    async findOneUsers(requestParameters: FindOneUsersRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UserDto> {
        const response = await this.findOneUsersRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
