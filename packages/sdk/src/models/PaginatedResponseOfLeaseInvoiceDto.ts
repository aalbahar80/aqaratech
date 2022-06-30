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
    LeaseInvoiceDto,
    LeaseInvoiceDtoFromJSON,
    LeaseInvoiceDtoFromJSONTyped,
    LeaseInvoiceDtoToJSON,
} from './LeaseInvoiceDto';
import {
    PaginatedDto,
    PaginatedDtoFromJSON,
    PaginatedDtoFromJSONTyped,
    PaginatedDtoToJSON,
} from './PaginatedDto';
import {
    PaginatedMetaDto,
    PaginatedMetaDtoFromJSON,
    PaginatedMetaDtoFromJSONTyped,
    PaginatedMetaDtoToJSON,
} from './PaginatedMetaDto';
import {
    PaginatedResponseOfLeaseInvoiceDtoAllOf,
    PaginatedResponseOfLeaseInvoiceDtoAllOfFromJSON,
    PaginatedResponseOfLeaseInvoiceDtoAllOfFromJSONTyped,
    PaginatedResponseOfLeaseInvoiceDtoAllOfToJSON,
} from './PaginatedResponseOfLeaseInvoiceDtoAllOf';

/**
 * 
 * @export
 * @interface PaginatedResponseOfLeaseInvoiceDto
 */
export interface PaginatedResponseOfLeaseInvoiceDto {
    /**
     * 
     * @type {PaginatedDto}
     * @memberof PaginatedResponseOfLeaseInvoiceDto
     */
    meta: PaginatedDto;
    /**
     * 
     * @type {Array<LeaseInvoiceDto>}
     * @memberof PaginatedResponseOfLeaseInvoiceDto
     */
    results?: Array<LeaseInvoiceDto>;
}

export function PaginatedResponseOfLeaseInvoiceDtoFromJSON(json: any): PaginatedResponseOfLeaseInvoiceDto {
    return PaginatedResponseOfLeaseInvoiceDtoFromJSONTyped(json, false);
}

export function PaginatedResponseOfLeaseInvoiceDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedResponseOfLeaseInvoiceDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': PaginatedDtoFromJSON(json['meta']),
        'results': !exists(json, 'results') ? undefined : ((json['results'] as Array<any>).map(LeaseInvoiceDtoFromJSON)),
    };
}

export function PaginatedResponseOfLeaseInvoiceDtoToJSON(value?: PaginatedResponseOfLeaseInvoiceDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': PaginatedDtoToJSON(value.meta),
        'results': value.results === undefined ? undefined : ((value.results as Array<any>).map(LeaseInvoiceDtoToJSON)),
    };
}

