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
    UnitTenantDto,
    UnitTenantDtoFromJSON,
    UnitTenantDtoFromJSONTyped,
    UnitTenantDtoToJSON,
} from './UnitTenantDto';

/**
 * 
 * @export
 * @interface UnitLeaseTenantDtoTenant
 */
export interface UnitLeaseTenantDtoTenant {
    /**
     * 
     * @type {string}
     * @memberof UnitLeaseTenantDtoTenant
     */
    readonly id: string;
    /**
     * 
     * @type {string}
     * @memberof UnitLeaseTenantDtoTenant
     */
    shortName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UnitLeaseTenantDtoTenant
     */
    fullName: string;
}

export function UnitLeaseTenantDtoTenantFromJSON(json: any): UnitLeaseTenantDtoTenant {
    return UnitLeaseTenantDtoTenantFromJSONTyped(json, false);
}

export function UnitLeaseTenantDtoTenantFromJSONTyped(json: any, ignoreDiscriminator: boolean): UnitLeaseTenantDtoTenant {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'shortName': !exists(json, 'shortName') ? undefined : json['shortName'],
        'fullName': json['fullName'],
    };
}

export function UnitLeaseTenantDtoTenantToJSON(value?: UnitLeaseTenantDtoTenant | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'shortName': value.shortName,
        'fullName': value.fullName,
    };
}

