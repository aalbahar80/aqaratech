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
import {
    UnitBreadcrumbsDto,
    UnitBreadcrumbsDtoFromJSON,
    UnitBreadcrumbsDtoFromJSONTyped,
    UnitBreadcrumbsDtoToJSON,
} from './UnitBreadcrumbsDto';
import {
    UnitLeaseDto,
    UnitLeaseDtoFromJSON,
    UnitLeaseDtoFromJSONTyped,
    UnitLeaseDtoToJSON,
} from './UnitLeaseDto';

/**
 * 
 * @export
 * @interface UnitOneDto
 */
export interface UnitOneDto {
    /**
     * 
     * @type {string}
     * @memberof UnitOneDto
     */
    readonly id: string;
    /**
     * 
     * @type {Date}
     * @memberof UnitOneDto
     */
    readonly createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof UnitOneDto
     */
    readonly updatedAt: Date;
    /**
     * 
     * @type {Array<UnitLeaseDto>}
     * @memberof UnitOneDto
     */
    readonly leases: Array<UnitLeaseDto>;
    /**
     * 
     * @type {UnitBreadcrumbsDto}
     * @memberof UnitOneDto
     */
    breadcrumbs: UnitBreadcrumbsDto;
    /**
     * 
     * @type {string}
     * @memberof UnitOneDto
     */
    propertyId: string;
    /**
     * 
     * @type {string}
     * @memberof UnitOneDto
     */
    unitNumber: string;
    /**
     * 
     * @type {number}
     * @memberof UnitOneDto
     */
    floor: number | null;
    /**
     * 
     * @type {number}
     * @memberof UnitOneDto
     */
    size: number | null;
    /**
     * 
     * @type {number}
     * @memberof UnitOneDto
     */
    bed: number | null;
    /**
     * 
     * @type {number}
     * @memberof UnitOneDto
     */
    bath: number | null;
    /**
     * 
     * @type {number}
     * @memberof UnitOneDto
     */
    marketRent: number | null;
    /**
     * 
     * @type {string}
     * @memberof UnitOneDto
     */
    type: string | null;
    /**
     * 
     * @type {string}
     * @memberof UnitOneDto
     */
    usage: string | null;
}

export function UnitOneDtoFromJSON(json: any): UnitOneDto {
    return UnitOneDtoFromJSONTyped(json, false);
}

export function UnitOneDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UnitOneDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
        'leases': ((json['leases'] as Array<any>).map(UnitLeaseDtoFromJSON)),
        'breadcrumbs': UnitBreadcrumbsDtoFromJSON(json['breadcrumbs']),
        'propertyId': json['propertyId'],
        'unitNumber': json['unitNumber'],
        'floor': json['floor'],
        'size': json['size'],
        'bed': json['bed'],
        'bath': json['bath'],
        'marketRent': json['marketRent'],
        'type': json['type'],
        'usage': json['usage'],
    };
}

export function UnitOneDtoToJSON(value?: UnitOneDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'breadcrumbs': UnitBreadcrumbsDtoToJSON(value.breadcrumbs),
        'propertyId': value.propertyId,
        'unitNumber': value.unitNumber,
        'floor': value.floor,
        'size': value.size,
        'bed': value.bed,
        'bath': value.bath,
        'marketRent': value.marketRent,
        'type': value.type,
        'usage': value.usage,
    };
}

