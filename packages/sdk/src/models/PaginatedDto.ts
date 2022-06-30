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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface PaginatedDto
 */
export interface PaginatedDto {
    /**
     * 
     * @type {number}
     * @memberof PaginatedDto
     */
    page: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedDto
     */
    take: number;
    /**
     * Total number of items in the collection
     * @type {number}
     * @memberof PaginatedDto
     */
    itemCount: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedDto
     */
    pageCount: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginatedDto
     */
    hasPreviousPage: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginatedDto
     */
    hasNextPage: boolean;
}

export function PaginatedDtoFromJSON(json: any): PaginatedDto {
    return PaginatedDtoFromJSONTyped(json, false);
}

export function PaginatedDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'page': json['page'],
        'take': json['take'],
        'itemCount': json['itemCount'],
        'pageCount': json['pageCount'],
        'hasPreviousPage': json['hasPreviousPage'],
        'hasNextPage': json['hasNextPage'],
    };
}

export function PaginatedDtoToJSON(value?: PaginatedDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'page': value.page,
        'take': value.take,
        'itemCount': value.itemCount,
        'pageCount': value.pageCount,
        'hasPreviousPage': value.hasPreviousPage,
        'hasNextPage': value.hasNextPage,
    };
}

